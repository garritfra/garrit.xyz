# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.18.3-bullseye AS build

WORKDIR /go/src

COPY . /go/src

RUN GO111MODULE=off go build -o /jurassic main.go

##
## Deploy
##
FROM gcr.io/distroless/base-debian11

WORKDIR /

COPY --from=build /jurassic /jurassic

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/jurassic"]

