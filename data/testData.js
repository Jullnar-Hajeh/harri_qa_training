module.exports = {
  getDatatable() {
    return [
      { name: "Alice", role: "Manager" },
      { name: "Bob", role: "Developer" },
      { name: "Charlie", role: "Analyst" }
    ];
  },

  
  generateUniqueEmail() {
    return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}@test.com`;
  }

};