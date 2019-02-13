workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for Firebase"]
}

action "GitHub Action for Firebase" {
  uses = "w9jds/firebase-action@7d6b2b058813e1224cdd4db255b2f163ae4084d3"
  secrets = ["FIREBASE_TOKEN"]
}
