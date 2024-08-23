var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CruddyForm extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "changeHandler");
    __publicField(this, "errorValues");
    __publicField(this, "inputHandler");
    __publicField(this, "passwordRevealHandler");
    __publicField(this, "requirements");
    __publicField(this, "requirementsNodes");
    this.changeHandler = this.handleChange.bind(this);
    this.errorValues = /* @__PURE__ */ new Map();
    this.inputHandler = this.handleInput.bind(this);
    this.passwordRevealHandler = this.handlePasswordReveal.bind(this);
    this.requirementsNodes = /* @__PURE__ */ new Map();
    this.requirements = /* @__PURE__ */ new Map();
    this.querySelectorAll("[type]").forEach((element) => {
      if (element instanceof HTMLInputElement) {
        if (element.getAttribute("type") === "password") {
          if (element.parentNode) {
            for (const btn of [".button-password-hide", ".button-password-show"]) {
              const buttonNode = element.parentNode.querySelector(btn);
              if (buttonNode instanceof HTMLElement) {
                buttonNode.addEventListener("click", this.passwordRevealHandler);
                buttonNode.click();
              }
            }
          }
        }
      }
    });
    this.querySelectorAll("[data-endpoint]").forEach((element) => {
      if (element instanceof HTMLInputElement) {
        if (element.parentNode) {
          const requirementsNode = element.parentNode.querySelector("div.requirements");
          if (requirementsNode && requirementsNode instanceof HTMLElement) {
            this.requirementsNodes.set(element.id, requirementsNode);
            this.requirements.set(element.id, requirementsNode.innerHTML);
          }
        }
        element.addEventListener("input", this.inputHandler);
        element.addEventListener("change", this.changeHandler);
      }
    });
  }
  async callEndpoint(element) {
    const url = element.getAttribute("data-endpoint") + element.value;
    try {
      const response = await fetch(url);
      if (response.status === 422) {
        const data = await response.json();
        if (data.message) {
          element.setCustomValidity(data.message);
          this.errorValues.set(element.id, element.value);
          const requirementsNode = this.requirementsNodes.get(element.id);
          if (requirementsNode) {
            requirementsNode.innerHTML = data.message;
          }
          element.focus();
        } else {
          element.setCustomValidity("");
        }
        element.reportValidity();
      }
    } catch (error) {
      console.error("Error calling endpoint:", error);
    }
  }
  /** Call the remote validator when the entered value has changed. */
  async handleChange(event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    const element = event.target;
    if (!element.validity.valid) {
      return;
    }
    await this.callEndpoint(element);
  }
  /** Reset the error message once the user starts editing. */
  async handleInput(event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    event.target.setCustomValidity("");
    if (event.target.value === this.errorValues.get(event.target.id)) {
      await this.callEndpoint(event.target);
    }
    const requirementsNode = this.requirementsNodes.get(event.target.id);
    const requirementsHTML = this.requirements.get(event.target.id);
    if (requirementsNode && requirementsHTML) {
      requirementsNode.innerHTML = requirementsHTML;
    }
  }
  handlePasswordReveal(event) {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    const parentNode = event.target.parentNode;
    if (!parentNode) {
      return;
    }
    const input = parentNode.querySelector("[type]");
    if (!input) {
      return;
    }
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
    const buttonHide = parentNode.querySelector(".button-password-hide");
    const buttonShow = parentNode.querySelector(".button-password-show");
    if (buttonHide && buttonShow) {
      buttonHide.style.display = input.type === "text" ? "flex" : "none";
      buttonShow.style.display = input.type === "text" ? "none" : "flex";
    }
  }
}
customElements.define("cruddy-form", CruddyForm);
export {
  CruddyForm
};
