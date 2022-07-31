import React, { useRef, useEffect, useState } from "react";
import background from "../../images/background.png";
import hillsCode from "../../images/hillsCode.png";
import spriteRunRight from "../../images/spriteRunRight.png";
import spriteRunLeft from "../../images/spriteRunLeft.png";
import spriteStand from "../../images/spriteStand.png";
import laptop from "../../images/laptop.png";
import hey from "../../images/hey.png";
import kate from "../../images/kate.png";
import linked from "../../images/linked.png";
import style from "./style.module.css";
import { GAME_STRINGS } from "./strings";
import { Player } from "./player";
import { GenericObject } from "./genericObject";
import { Platform } from "./platform";
import LinkedInButton from "../LinkedInButton";

const Game = () => {
  const ref = useRef();

  const [text, setText] = useState(GAME_STRINGS.default);

  useEffect(() => {
    // images init

    const createImage = (imageSrc) => {
      const image = new Image();
      image.src = imageSrc;
      return image;
    };

    //canvas init
    const canvas = ref.current;
    canvas.width = 800;
    canvas.height = 580;
    const c = canvas.getContext("2d");

    const rightBreakPoint = 450;
    const leftBreakPoint = 50;

    const player = new Player({ c, canvas, image: createImage(spriteStand) });
    const platforms = [
      new Platform({
        c,
        x: 1000,
        y: 460,
        image: createImage(hey),
        action: "info",
      }),
      new Platform({
        c,
        x: 1300,
        y: 360,
        image: createImage(laptop),
        action: "about",
      }),
      new Platform({
        c,
        x: 1500,
        y: 460,
        image: createImage(kate),
        action: "kate",
      }),
      new Platform({
        c,
        x: 1700,
        y: 330,
        image: createImage(linked),
        action: "linked",
      }),
    ];

    const genericObjects = [
      new GenericObject(
        { c, x: -1, y: -1, image: createImage(hillsCode) },
        { c, x: -1, y: -1, image: createImage(background) }
      ),
    ];
    const keys = {
      right: { pressed: false },
      left: { pressed: false },
    };

    let scrollOffset = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      genericObjects.forEach((genericObject) => {
        return genericObject.draw();
      });

      player.update();

      platforms.forEach((platform) => {
        return platform.draw();
      });

      platforms.forEach((platform) => {
        if (
          //player is on the platform -collision
          player.position.y + player.height <= platform.position.y &&
          player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
          player.position.x + player.width >= platform.position.x &&
          player.position.x <= platform.position.x + platform.width
        ) {
          player.velocity.y = 0;

          if (platform.action === "info") {
            setText(GAME_STRINGS.info);
          }

          if (platform.action === "kate") {
            setText(GAME_STRINGS.kate);
          }
          if (platform.action === "about") {
            setText(GAME_STRINGS.about);
          }

          if (platform.action === "linked") {
            setText(GAME_STRINGS.linked);
          }
        }
      });

      if (keys.right.pressed && player.position.x < rightBreakPoint) {
        player.animating = true;
        player.image = createImage(spriteRunRight);
        player.velocity.x = 6;
        setText(GAME_STRINGS.jumpInstruction);
      } else if (
        (keys.left.pressed && player.position.x > leftBreakPoint) ||
        (keys.left && scrollOffset === 0 && player.position > 0)
      ) {
        player.velocity.x = -6;
        setText(GAME_STRINGS.emptyLeftInstruction);
      } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
          scrollOffset += 6;
          platforms.forEach((platform) => {
            platform.position.x -= 6;
          });
          genericObjects.forEach((genericObject) => {
            genericObject.position.x -= 2.2;
          });
        } else if (keys.left.pressed) {
          scrollOffset -= 6;
          genericObjects.forEach((genericObject) => {
            genericObject.position.x += 2.2;
          });
          platforms.forEach((platform) => {
            return (platform.position.x += 6);
          });
        }
      }
      if (scrollOffset > 4000) {
        return window.location.reload();
      }
    };

    animate();

    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowRight":
          player.animating = true;
          keys.right.pressed = true;
          player.image = createImage(spriteRunRight);
          break;
        case "ArrowLeft":
          keys.left.pressed = true;
          player.animating = true;
          player.image = createImage(spriteRunLeft);

          break;
        case "ArrowUp":
          if (player.velocity.y < -10) {
            break;
          }
          player.velocity.y -= 9;
          break;
        case "ArrowDown":
          break;
        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowRight":
          keys.right.pressed = false;
          player.velocity.x = 0;
          player.animating = false;
          player.image = createImage(spriteStand);
          break;
        case "ArrowLeft":
          keys.left.pressed = false;
          player.animating = false;
          player.image = createImage(spriteStand);
          break;
        case "ArrowUp":
          player.image = createImage(spriteStand);

          break;
        case "ArrowDown":
          break;
        default:
          break;
      }
    });
    player.draw();
  }, []);

  return (
    <div>
      <div className={style.hideOnLarge}>
        <h4>{GAME_STRINGS.smallScreens}</h4>
      </div>
      <div className={`${style.gameContainer} ${style.hideOnSmall}`}>
        <canvas ref={ref}></canvas>
        <div className={style.textContainer}>
          <h4>{`${text}`}</h4>
          {text === GAME_STRINGS.linked && <LinkedInButton />}
        </div>
      </div>
    </div>
  );
};

export default Game;
