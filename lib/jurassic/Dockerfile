# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.18.3-alpine3.16 AS build

WORKDIR /go/src

COPY . /go/src

RUN GO111MODULE=off CGO_ENABLED=0 go build -o /jurassic main.go

##
## Deploy
##
FROM scratch

WORKDIR /

COPY --from=build /jurassic /jurassic

EXPOSE 8080

ENTRYPOINT ["/jurassic"]

