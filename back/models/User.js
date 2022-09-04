class User {
  constructor(firstname, lastname, email, password) {
    //modèle pour créer des objets en JS. opérateur NEW pour créer l'objet user.
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = 2;
  }
}

module.exports = User;
