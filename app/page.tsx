"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Download, Eye, Code2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSite, setGeneratedSite] = useState<{
    html: string
    css: string
  } | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate API call to generate website
    setTimeout(() => {
      const site = generateWebsite(prompt)
      setGeneratedSite(site)
      setIsGenerating(false)
    }, 2000)
  }

  const handleDownload = () => {
    if (!generatedSite) return

    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Site</title>
  <style>${generatedSite.css}</style>
</head>
<body>
${generatedSite.html}
</body>
</html>`

    const blob = new Blob([fullHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "website.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI</span>
            </div>
            <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Instant Website Generator
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Type what you want. Watch it appear. Pure magic in seconds.
            </p>

            {/* Input Section */}
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Input
                  placeholder='Try: "Make a travel blog site" or "Create a portfolio page"'
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  className="h-14 flex-1 text-base"
                  disabled={isGenerating}
                />
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="h-14 gap-2 px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {generatedSite && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Your Website is Ready</h2>
              <p className="mt-2 text-muted-foreground">Preview your site or download the HTML file</p>
            </div>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download HTML
            </Button>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="html" className="gap-2">
                <Code2 className="h-4 w-4" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="gap-2">
                <Code2 className="h-4 w-4" />
                CSS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-0">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>${generatedSite.css}</style>
                      </head>
                      <body>${generatedSite.html}</body>
                    </html>
                  `}
                  className="h-[600px] w-full"
                  title="Preview"
                />
              </div>
            </TabsContent>

            <TabsContent value="html" className="mt-0">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <pre className="overflow-auto p-6 text-sm">
                  <code className="text-foreground">{generatedSite.html}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="css" className="mt-0">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <pre className="overflow-auto p-6 text-sm">
                  <code className="text-foreground">{generatedSite.css}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Features Section */}
      {!generatedSite && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon="⚡"
              title="Instant Generation"
              description="Watch your website materialize in seconds. No coding required."
            />
            <FeatureCard
              icon="🎨"
              title="Smart Design"
              description="AI understands your vision and creates beautiful, responsive layouts."
            />
            <FeatureCard
              icon="📦"
              title="Ready to Use"
              description="Download clean HTML/CSS code that works everywhere."
            />
          </div>
        </div>
      )}
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

// Simple template generator based on prompt
function generateWebsite(prompt: string): { html: string; css: string } {
  const lowerPrompt = prompt.toLowerCase()

  // Travel blog template
  if (lowerPrompt.includes("travel") || lowerPrompt.includes("blog")) {
    return {
      html: `
  <div class="container">
    <header class="header">
      <h1>✈️ Wanderlust Chronicles</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#destinations">Destinations</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    
    <main>
      <section class="hero">
        <h2>Explore the World, One Story at a Time</h2>
        <p>Join me on incredible journeys across continents and cultures</p>
      </section>
      
      <section class="posts">
        <article class="post-card">
          <div class="post-image">🏔️</div>
          <h3>Mountain Adventures in Switzerland</h3>
          <p>Discovering the breathtaking peaks of the Swiss Alps</p>
          <a href="#" class="read-more">Read More →</a>
        </article>
        
        <article class="post-card">
          <div class="post-image">🏖️</div>
          <h3>Hidden Beaches of Thailand</h3>
          <p>Secret coastal paradises waiting to be explored</p>
          <a href="#" class="read-more">Read More →</a>
        </article>
        
        <article class="post-card">
          <div class="post-image">🏛️</div>
          <h3>Ancient Ruins of Rome</h3>
          <p>Walking through centuries of history and culture</p>
          <a href="#" class="read-more">Read More →</a>
        </article>
      </section>
    </main>
    
    <footer>
      <p>© 2025 Wanderlust Chronicles. Follow your dreams.</p>
    </footer>
  </div>`,
      css: `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
  }
  
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  nav {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }
  
  nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
  }
  
  nav a:hover {
    opacity: 0.8;
  }
  
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
  }
  
  .hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: #718096;
  }
  
  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;
  }
  
  .post-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
  
  .post-image {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .post-card h3 {
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
  
  .post-card p {
    color: #718096;
    margin-bottom: 1rem;
  }
  
  .read-more {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }
  
  footer {
    background: #2d3748;
    color: white;
    text-align: center;
    padding: 2rem;
  }`,
    }
  }

  // Portfolio template
  if (lowerPrompt.includes("portfolio")) {
    return {
      html: `
  <div class="container">
    <header class="header">
      <h1>Alex Designer</h1>
      <p class="tagline">Creative Designer & Developer</p>
    </header>
    
    <section class="about">
      <h2>About Me</h2>
      <p>I create beautiful digital experiences that make a difference. With 5+ years of experience in design and development, I bring ideas to life.</p>
    </section>
    
    <section class="portfolio">
      <h2>Featured Work</h2>
      <div class="projects">
        <div class="project-card">
          <div class="project-placeholder">🎨</div>
          <h3>Brand Identity Design</h3>
          <p>Complete rebranding for a tech startup</p>
        </div>
        <div class="project-card">
          <div class="project-placeholder">📱</div>
          <h3>Mobile App UI</h3>
          <p>Fitness tracking app with modern design</p>
        </div>
        <div class="project-card">
          <div class="project-placeholder">🌐</div>
          <h3>E-commerce Platform</h3>
          <p>Full-stack online shopping experience</p>
        </div>
      </div>
    </section>
    
    <section class="contact">
      <h2>Let's Work Together</h2>
      <p>Have a project in mind? Get in touch!</p>
      <a href="mailto:hello@example.com" class="cta-button">Contact Me</a>
    </section>
  </div>`,
      css: `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #1a202c;
    background: #ffffff;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header {
    text-align: center;
    padding: 4rem 0;
    border-bottom: 2px solid #e2e8f0;
  }
  
  .header h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .tagline {
    font-size: 1.25rem;
    color: #718096;
  }
  
  .about {
    padding: 4rem 0;
    text-align: center;
  }
  
  .about h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .about p {
    font-size: 1.125rem;
    color: #4a5568;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .portfolio {
    padding: 4rem 0;
  }
  
  .portfolio h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .project-card {
    background: #f7fafc;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: transform 0.3s;
  }
  
  .project-card:hover {
    transform: scale(1.05);
  }
  
  .project-placeholder {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  
  .project-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .project-card p {
    color: #718096;
  }
  
  .contact {
    padding: 4rem 0;
    text-align: center;
  }
  
  .contact h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .contact p {
    font-size: 1.125rem;
    color: #4a5568;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.3s;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
  }`,
    }
  }

  // Default landing page template
  return {
    html: `
  <div class="container">
    <header class="header">
      <nav class="nav">
        <div class="logo">QuickList</div>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <button class="btn-primary">Get Started</button>
        </div>
      </nav>
    </header>
    
    <main>
      <section class="hero">
        <h1>Build Your Dream Website</h1>
        <p>The fastest way to create beautiful websites without coding</p>
        <div class="cta-buttons">
          <button class="btn-primary btn-large">Start Building</button>
          <button class="btn-secondary btn-large">Watch Demo</button>
        </div>
      </section>
      
      <section class="features">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Create websites in minutes, not hours</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Beautiful Design</h3>
          <p>Professional templates that look amazing</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Mobile Ready</h3>
          <p>Responsive designs that work everywhere</p>
        </div>
      </section>
    </main>
    
    <footer class="footer">
      <p>© 2025 Your Company. Made with QuickList.</p>
    </footer>
  </div>`,
    css: `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #2d3748;
  }
  
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    padding: 1rem 2rem;
  }
  
  .nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #4a5568;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .nav-links a:hover {
    color: #667eea;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
  
  .btn-secondary {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .btn-secondary:hover {
    background: #f7fafc;
  }
  
  .btn-large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  main {
    flex: 1;
  }
  
  .hero {
    text-align: center;
    padding: 6rem 2rem;
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  }
  
  .hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #1a202c;
  }
  
  .hero p {
    font-size: 1.5rem;
    color: #718096;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .features {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.07);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #2d3748;
  }
  
  .feature-card p {
    color: #718096;
    line-height: 1.6;
  }
  
  .footer {
    background: #2d3748;
    color: white;
    text-align: center;
    padding: 2rem;
  }`,
  }
}
