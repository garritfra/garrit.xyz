# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.18.3-bullseye AS build

WORKDIR /app

COPY main.go ./

RUN go build -o /jurassic main.go

##
## Deploy
##
FROM gcr.io/distroless/base-debian11

WORKDIR /

COPY --from=build /jurassic /jurassic

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/jurassic"]

