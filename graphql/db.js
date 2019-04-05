export const people = [
  {
      id: 1,
      name: "Moon",
      age: 50,
      gender: "male"
  },
  {
      id: 2,
      name: "Ann",
      age: 16,
      gender: "female"
  },
  {
      id: 3,
      name: "Nicolas",
      age: 23,
      gender: "male"
  }
];

export const getById = id => {
    const filteredPeople = people.filter(person => person.id === id );
    return filteredPeople[0]
}