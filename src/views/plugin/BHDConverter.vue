<template>
  <div class="cont-box gray">
    <h2 class="title">进制转换</h2>
    <div class="c-main">
      <ul class="c-menu">
        <li
          data-hex="2"
          :class="{ hover: currentIndex === 2 }"
          @click="hexTab(2)"
        >
          <a class="/binary/">二进制</a>
        </li>
        <li
          data-hex="8"
          :class="{ hover: currentIndex === 8 }"
          @click="hexTab(8)"
        >
          <a class="/octal/">八进制</a>
        </li>
        <li
          data-hex="10"
          :class="{ hover: currentIndex === 10 }"
          @click="hexTab(10)"
        >
          <a class="/decimal/">十进制</a>
        </li>
        <li
          data-hex="16"
          :class="{ hover: currentIndex === 16 }"
          @click="hexTab(16)"
        >
          <a class="/hexadecimal/">16进制</a>
        </li>
        <li
          data-hex="32"
          :class="{ hover: currentIndex === 32 }"
          @click="hexTab(32)"
        >
          <a class="/base32/">32进制</a>
        </li>
      </ul>
      <div class="input">
        <input
          class="c-input"
          placeholder="在这里输入数字"
          v-model="inputVal"
        />
      </div>
      <div class="operate">
        <span>转换到：</span>
        <div class="hots">
          <label :class="{ hover: targetIndex === 2 }" @click="labTab(2)"
            ><input type="radio" name="to" value="2" />二进制</label
          >
          <label :class="{ hover: targetIndex === 8 }" @click="labTab(8)"
            ><input type="radio" name="to" value="8" />八进制</label
          >
          <label :class="{ hover: targetIndex === 10 }" @click="labTab(10)"
            ><input type="radio" name="to" value="10" />十进制</label
          >
          <label :class="{ hover: targetIndex === 16 }" @click="labTab(16)"
            ><input type="radio" name="to" value="16" />16进制</label
          >
          <label :class="{ hover: targetIndex === 32 }" @click="labTab(32)"
            ><input type="radio" name="to" value="32" />32进制</label
          >
        </div>
        <button @click="transform">转换</button>
      </div>
      <div class="result" v-show="showResult">
        <div class="head">
          <h2>{{ currentIndex }}进制转换成{{ targetIndex }}的结果：</h2>
          <button class="copy" type="button" @click="copy(resultMsg)">
            <svg viewBox="0 0 50 50">
              <path
                d="M5,2H39a1,1,0,0,1,1,1V41a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V3A1,1,0,0,1,5,2ZM6,44H5a3,3,0,0,1-3-3V3A3,3,0,0,1,5,0H39a3,3,0,0,1,3,3V8h2a4,4,0,0,1,4,4V46a4,4,0,0,1-4,4H10a4,4,0,0,1-4-4V44Zm2,2a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V12a2,2,0,0,0-2-2H42V41a3,3,0,0,1-3,3H8v2Z"
              ></path>
              <path
                d="M10.5,14h23v2h-23V14Zm0,6h23v2h-23V20Zm0,6h23v2h-23V26Z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="big">{{ resultMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      currentIndex: 10,
      targetIndex: 2,
      showResult: true,
      resultMsg: "",
      inputVal: "",
    };
  },
  methods: {
    hexTab(n) {
      this.currentIndex = n;
      this.showResult = false;
    },
    labTab(n) {
      this.targetIndex = n;
      this.transform();
    },
    // 十进制转换成其他进制：数字.toString(要转换的进制)
    // 其他进制转换成十进制: parseInt(要转换的数字，把这个数字当成几进制)
    transform() {
      this.showResult = true;
      let m = parseInt(this.inputVal, this.currentIndex);
      this.resultMsg = m.toString(this.targetIndex);
    },
    // 复制
    copy(txt) {
      let clipboard = new Clipboard(".copy", {
        text: () => {
          return txt;
        },
      });
      // clipboard.on("success", (e) => {
      clipboard.on("success", () => {
        console.log("复制成功！");
        // console.log(e.action); // 动作
        // console.log(e.text); // 复制的文本内容
        // console.log(e.trigger);
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        if (typeof txt != undefined) {
          console.log("请输入正确的值");
        } else {
          console.log("该浏览器不支持自动复制,请手动复制！");
        }
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.gray {
  background-color: #f5f5f3;
}
.title {
  font-size: 16px;
  color: #333;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
}
.c-main {
  padding: 10px;
  .c-menu {
    display: flex;
    li {
      flex: 1;
      a {
        display: block;
        padding: 0 10px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #48484a;
        background: #525256;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: #ff6d6d;
          color: #fff;
        }
      }
      &.hover {
        a {
          background: #f55;
          box-shadow: 0 5px 15px -6px rgb(255, 85, 85, 0.8);
        }
      }
      &:first-child {
        a {
          border-radius: 8px 0 0 0;
        }
      }
      &:last-child {
        a {
          border-radius: 0 8px 0 0;
          border-right: 0;
        }
      }
    }
  }
}
.input {
  background: #fff;
  margin-bottom: 6px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 10px -4px rgba(93, 90, 138, 0.1);
  input {
    display: block;
    width: 100%;
    font-size: 26px;
    line-height: 40px;
    padding: 40px 30px;
    background: #fff;
    border-right: 0;
    border-radius: 0 0 8px 8px;
    border: 0;

    &::-webkit-input-placeholder {
      color: #ccc;
    }
  }
}
.operate {
  display: flex;
  justify-content: space-between;
  background: #fff;
  line-height: 40px;
  padding: 20px 30px;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 10px -2px rgba(93, 90, 138, 0.1);
  span {
    font-size: 17px;
    font-weight: bold;
  }
  button {
    width: 120px;
    font-size: 16px;
    color: #fff;
    background: #f55;
    border-radius: 8px;
    font-weight: bold;
    line-height: 40px;
    cursor: pointer;
    transition: all 0.25s;
  }
  .hots {
    display: flex;
    width: calc(100% - 200px);
    border: 1px solid #e5e5ea;
    border-radius: 6px;
    label {
      flex: 1;
      font-size: 12px;
      text-align: center;
      color: #525256;
      border-radius: 0;
      border-right: 1px solid #e5e5ea;
      cursor: pointer;
      &.hover {
        font-weight: bold;
        background: #ffede8;
        color: #ff3434;
      }
      &:hover {
        color: #ff3434;
      }
      &:last-child {
        border-right: 0;
      }
      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
      }
    }
  }
}
.result {
  background: #fffaf8;
  line-height: 44px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 2px -4px rgba(202, 123, 123, 0.2);
  .head {
    position: relative;
    display: block;
    text-align: center;
  }
  h2 {
    font-size: 14px;
    font-weight: 700;
    color: #f55;
  }
  .copy {
    position: absolute;
    width: 44px;
    right: 0;
    top: -6px;
    background: transparent;
    cursor: pointer;
    svg {
      width: 23px;
      height: 23px;
      padding: 10px 0 0;
      path {
        fill: #eab6a7;
        fill-rule: evenodd;
      }
    }
    &:hover {
      path {
        fill: #ec3d3d;
      }
    }
  }
  &:hover {
    path {
      fill: #f55;
    }
  }
  .big {
    resize: vertical;
    width: 100%;
    height: auto;
    padding: 16px 10px;
    line-height: 44px;
    text-align: center;
    font-size: 24px;
    word-wrap: break-word;
    color: #222;
  }
}
@media screen and (max-width: 500px) {
  .c-main {
    padding: 0.1rem;
    .c-menu {
      li {
        a {
          padding: 0 0.05rem;
          font-size: 0.12rem;
          line-height: 0.4rem;
        }
      }
    }
  }
  .operate {
    position: relative;
    padding: 0.4rem 0.1rem 0.2rem;
    span {
      position: absolute;
      top: 0;
      line-height: 0.4rem;
    }
    button {
      width: 0.5rem;
      font-size: 0.16rem;
      border-radius: 0.08rem;
      line-height: 0.4rem;
    }
    .hots {
      width: calc(100% - 0.6rem);
      border-radius: 0.06rem;
      label {
        font-size: 0.12rem;
      }
    }
  }
}
</style>
