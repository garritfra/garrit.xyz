# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.18.3-bullseye AS build

COPY *.go ./

RUN go build -o /app main.go

##
## Deploy
##
FROM gcr.io/distroless/base-debian11

WORKDIR /

COPY --from=build /app /app

EXPOSE 8080

USER nonroot:nonroot

ENTRYPOINT ["/app"]
