FROM golang:1.14.2
COPY main.go /app/
RUN pwd
WORKDIR /app
RUN pwd
RUN go build main.go 
CMD [ "./main" ]
