FROM golang:1.14 as builder
WORKDIR /app
COPY main.go /app/
RUN go build main.go
ENTRYPOINT [ "/main" ]
