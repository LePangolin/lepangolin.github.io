export let Ls = {
    set: function (key, value) {
      this.inventory[key] = value;
    },
    get: function (key) {
      if (this.inventory[key] === undefined) {
        return null;
      }
      return this.inventory[key];
    },
    clear: function () {
      this.inventory = {};
    },
    inventory: {},
  };
