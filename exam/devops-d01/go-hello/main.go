package main

import (
    "fmt"
    "net/http"
    "os"
)

const Port = 8080

func main() {
    s := http.Server{
        Handler: http.HandlerFunc(func (res http.ResponseWriter, req *http.Request) {
            fmt.Println("I receive a request")
            what := os.Getenv("HELLO_WHAT")
            if what == "" {
                what = "World"
            }
            _, _ = res.Write([]byte(fmt.Sprintf("Hello %s !\n", what)))
        }),
        Addr: fmt.Sprintf("0.0.0.0:%d", Port),
    }

    fmt.Printf("Start listening on port %d\n", Port)
    err := s.ListenAndServe()
    if err != nil {
        panic(err)
    }
}