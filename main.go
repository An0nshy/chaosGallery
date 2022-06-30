package main

import (
	"chaosGallery/UseCases"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/*.html")
	r.Static("/assets", "./assets/")
	r.Use(cors.Default())

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	r.GET("/all", func(c *gin.Context) {
		c.JSON(http.StatusOK, UseCases.AllPictures())
	})

	r.GET("/chaosGallery/:filename", func(c *gin.Context) {
		filename := c.Param("filename")
		c.File(fmt.Sprintf("./assets/pictures/%s", filename))
	})

	err := r.Run()
	if err != nil {
		return
	} // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
