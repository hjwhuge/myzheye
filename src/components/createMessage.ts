// 函数方式调用message组件
import { createApp } from "vue";
import Message from "./Message.vue";
export type MessageType = "success" | "error" | "warn" | "info";

const createMessage = (type: MessageType, message: string, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    type,
    message,
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);
  setTimeout(() => {
    document.body.removeChild(mountNode);
    messageInstance.unmount();
  }, timeout);
};

export default createMessage;
