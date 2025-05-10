"use client"

import { FC, useEffect, useRef, useState } from "react"

const WaterColorEffect: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Color drops - birthday theme colors
    const colors = [
      "rgba(244, 114, 182, 0.3)", // pink
      "rgba(192, 132, 252, 0.3)", // purple
      "rgba(251, 146, 60, 0.3)",  // orange
      "rgba(56, 189, 248, 0.2)",  // blue
      "rgba(253, 186, 116, 0.2)", // peach
    ]

    class ColorDrop {
      x: number
      y: number
      radius: number
      maxRadius: number
      color: string
      velocity: { x: number; y: number }
      alpha: number
      expanding: boolean
      pulseSpeed: number
      rotationAngle: number
      rotationSpeed: number
      glowEffect: boolean

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 10 + 5
        this.maxRadius = Math.random() * 60 + 30
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.velocity = {
          x: (Math.random() - 0.5) * 1.2,
          y: (Math.random() - 0.5) * 1.2,
        }
        this.alpha = 0.05
        this.expanding = true
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.rotationAngle = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
        this.glowEffect = Math.random() > 0.5
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        
        // Create a more organic shape with rotation
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotationAngle)
        
        // Draw a more complex shape instead of a circle
        const numPoints = 6
        const angleStep = (Math.PI * 2) / numPoints
        let angle = 0
        
        ctx.moveTo(
          this.radius * Math.cos(angle), 
          this.radius * Math.sin(angle)
        )
        
        for (let i = 0; i < numPoints; i++) {
          angle += angleStep
          const radiusVariation = this.radius * (0.8 + Math.random() * 0.4)
          ctx.bezierCurveTo(
            this.radius * 1.2 * Math.cos(angle - angleStep/3),
            this.radius * 1.2 * Math.sin(angle - angleStep/3),
            this.radius * 1.2 * Math.cos(angle - angleStep/6),
            this.radius * 1.2 * Math.sin(angle - angleStep/6),
            radiusVariation * Math.cos(angle),
            radiusVariation * Math.sin(angle)
          )
        }
        
        ctx.closePath()
        
        // Use a simple color fill instead of gradient to avoid errors
        try {
          // Safe way to create gradient with proper parameters
          if (this.radius > 0) {
            const safeRadius = Math.max(0.1, this.radius)
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, safeRadius)
            const colorBase = this.color.substring(0, this.color.lastIndexOf(',') + 1)
            gradient.addColorStop(0, colorBase + ' 0.7)')
            gradient.addColorStop(0.6, this.color)
            gradient.addColorStop(1, colorBase + ' 0)')
            ctx.fillStyle = gradient
          } else {
            ctx.fillStyle = this.color
          }
        } catch (error) {
          // Fallback to solid color if gradient fails
        ctx.fillStyle = this.color
        }
        
        ctx.fill()
        
        // Add glow effect for some drops
        if (this.glowEffect) {
          ctx.shadowColor = this.color
          ctx.shadowBlur = Math.max(1, this.radius * 0.5)
          ctx.fill()
        }
        
        ctx.restore()
      }

      update() {
        // Slow drifting motion
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.rotationAngle += this.rotationSpeed

        // Size and opacity pulsing
        if (this.expanding) {
          this.radius += this.pulseSpeed * this.maxRadius
          this.alpha += 0.005
          if (this.radius > this.maxRadius) {
            this.expanding = false
          }
        } else {
          this.radius -= this.pulseSpeed * this.maxRadius * 0.7
          this.alpha -= 0.003
        }

        this.draw()
        return this.alpha > 0 && this.radius > 0
      }
    }

    let colorDrops: ColorDrop[] = []

    // Create new drops periodically
    const createDrops = () => {
      if (colorDrops.length < 15) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        colorDrops.push(new ColorDrop(x, y))
      }

      setTimeout(createDrops, Math.random() * 2000 + 800)
    }

    createDrops()

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Use a semi-transparent clear to create trailing effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and filter out dead drops
      colorDrops = colorDrops.filter((drop) => drop.update())

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  // Only render the canvas on the client to avoid hydration errors
  if (!isClient) {
    return null
  }

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}

export default WaterColorEffect
