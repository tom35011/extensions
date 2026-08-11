// Name: Motion ++
// ID: SPMotionPlusPlus
// Description: Enhanced motion controls for other sprites. Based on Scratch Motion blocks.
// By : tom350 <https://scratch.mit.edu/users/tom350/>
// (no Original field)
// License: MIT

(function (Scratch) {
  "use strict";

  class MotionPlusPlus {
    getInfo() {
      return {
        id: "MotionPlusPlus",
        name: "Motion ++",

        color1: "#4C97FF",
        color2: "#4280FF",
        color3: "#3373CC",

        blocks: [
          {
            opcode: "moveSteps",
            blockType: Scratch.BlockType.COMMAND,
            text: "move [SPRITE] [STEPS] steps [MODE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              STEPS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "turnRight",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn right [SPRITE] [DEG] degrees [MODE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              DEG: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "turnLeft",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn left [SPRITE] [DEG] degrees [MODE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              DEG: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "goToXY",
            blockType: Scratch.BlockType.COMMAND,
            text: "go to x [X] y [Y] for [SPRITE] [MODE]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "changeX",
            blockType: Scratch.BlockType.COMMAND,
            text: "change x by [DX] for [SPRITE] [MODE]",
            arguments: {
              DX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "changeY",
            blockType: Scratch.BlockType.COMMAND,
            text: "change y by [DY] for [SPRITE] [MODE]",
            arguments: {
              DY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: "set x to [X] for [SPRITE] [MODE]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: "set y to [Y] for [SPRITE] [MODE]",
            arguments: {
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "pointDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "point in direction [DIR] for [SPRITE] [MODE]",
            arguments: {
              DIR: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          },
          {
            opcode: "rotationStyle",
            blockType: Scratch.BlockType.COMMAND,
            text: "set rotation style [STYLE] for [SPRITE] [MODE]",
            arguments: {
              STYLE: { type: Scratch.ArgumentType.STRING, menu: "menuRotation" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "menuSprites" },
              MODE: { type: Scratch.ArgumentType.STRING, menu: "menuCloneMode" }
            }
          }
        ],

        menus: {
          menuSprites: {
            acceptReporters: false,
            items: "getSpriteNames"
          },
          menuCloneMode: {
            acceptReporters: false,
            items: "getCloneModes"
          },
          menuRotation: {
            acceptReporters: false,
            items: ["left-right", "don't rotate", "all around"]
          }
        }
      };
    }

    getSpriteNames() {
      return Scratch.vm.runtime.targets
        .filter(t => t.isSprite && !t.isStage)
        .map(t => t.sprite.name);
    }

    getCloneModes() {
      return ["sprite only", "clone included"];
    }

    _getTargets(name, mode) {
      const runtime = Scratch.vm.runtime;
      return runtime.targets.filter(t =>
        t.isSprite &&
        !t.isStage &&
        t.sprite.name === name &&
        (mode === "clone included" || !t.isClone)
      );
    }

    moveSteps(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) {
        const rad = Scratch.Cast.degToRad(t.direction);
        const nx = t.x + args.STEPS * Math.sin(rad);
        const ny = t.y + args.STEPS * Math.cos(rad);
        t.setXY(nx, ny);
      }
    }

    turnRight(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setDirection(t.direction + args.DEG);
    }

    turnLeft(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setDirection(t.direction - args.DEG);
    }

    goToXY(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setXY(args.X, args.Y);
    }

    // ⭐ FIXED VERSION — uses goToXY logic
    changeX(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) {
        const newX = t.x + args.DX;
        const newY = t.y;
        t.setXY(newX, newY);
      }
    }

    // ⭐ FIXED VERSION — uses goToXY logic
    changeY(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) {
        const newX = t.x;
        const newY = t.y + args.DY;
        t.setXY(newX, newY);
      }
    }

    setX(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setXY(args.X, t.y);
    }

    setY(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setXY(t.x, args.Y);
    }

    pointDirection(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setDirection(args.DIR);
    }

    rotationStyle(args) {
      const targets = this._getTargets(args.SPRITE, args.MODE);
      for (const t of targets) t.setRotationStyle(args.STYLE);
    }
  }

  Scratch.extensions.register(new MotionPlusPlus());
})(Scratch);
