export default [
  {
    name: "Web",
    subtopics: [
      {
        name: "Frontend",
        skills: [
          {
            name: "HTML",
            logo: require("./html.svg"),
            rating: 5
          }
        ]
      },
      {
        name: "Backend",
        skills: [{ name: "Express", logo: require("./express.svg"), rating: 4 }]
      }
    ]
  },
  {
    name: "Mobile",
    subtopics: [
      {
        name: "Android",
        skills: [{ name: "Java", logo: require("./java.svg"), rating: 5 }]
      },
      {
        name: "iOS",
        skills: [{ name: "Swift", logo: require("./swift.svg"), rating: 4 }]
      }
    ]
  }
];
