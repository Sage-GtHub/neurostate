import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  Download, 
  Play, 
  Clock, 
  Calendar,
  Search,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

interface VideoContent {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
}

interface Guide {
  id: number;
  title: string;
  description: string;
  pages: number;
  size: string;
  category: string;
  format: string;
}

interface Podcast {
  id: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  guest?: string;
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "The Complete Guide to Omega-3 Fatty Acids",
    excerpt: "Learn everything about omega-3s, their benefits for heart health, brain function, and how to choose the right supplement.",
    category: "Nutrition",
    readTime: "8 min read",
    date: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80"
  },
  {
    id: 2,
    title: "Red Light Therapy: Science and Benefits",
    excerpt: "Discover how red light therapy works, its proven benefits for recovery, skin health, and athletic performance.",
    category: "Recovery",
    readTime: "10 min read",
    date: "Jan 8, 2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
  {
    id: 3,
    title: "Sleep Optimisation for Peak Performance",
    excerpt: "Understanding the role of quality sleep in recovery and how supplements can support your natural sleep cycle.",
    category: "Sleep",
    readTime: "6 min read",
    date: "Jan 5, 2026",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
];

const videos: VideoContent[] = [
  {
    id: 1,
    title: "How to Use Red Light Therapy at Home",
    description: "Step-by-step guide on proper red light therapy usage, optimal distance, timing, and protocols for maximum benefits.",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?w=800&q=80",
    category: "Recovery"
  },
  {
    id: 2,
    title: "Ice Bath Technique: Complete Tutorial",
    description: "Learn the proper way to take ice baths, breathing techniques, and how to build cold tolerance safely.",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    category: "Recovery"
  },
  {
    id: 3,
    title: "Morning Supplement Stack Routine",
    description: "Watch our optimal morning supplement routine for energy, focus, and performance throughout the day.",
    duration: "6:20",
    thumbnail: "https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=800&q=80",
    category: "Nutrition"
  },
  {
    id: 4,
    title: "Sleep Optimisation: Evening Wind-Down Protocol",
    description: "Follow along with our science-backed evening routine to help your body and mind prepare for restorative sleep.",
    duration: "15:10",
    thumbnail: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800&q=80",
    category: "Sleep"
  },
];

const guides: Guide[] = [
  {
    id: 1,
    title: "30-Day Meal Plan for Athletes",
    description: "Complete nutrition plan with recipes, shopping lists, and macronutrient breakdowns optimised for performance.",
    pages: 45,
    size: "2.3 MB",
    category: "Nutrition",
    format: "PDF"
  },
  {
    id: 2,
    title: "Recovery Protocol Handbook",
    description: "Comprehensive guide covering red light therapy, cold exposure, PEMF, and supplement timing for optimal recovery.",
    pages: 32,
    size: "1.8 MB",
    category: "Recovery",
    format: "PDF"
  },
  {
    id: 3,
    title: "Sleep Optimisation Workbook",
    description: "Interactive workbook with sleep tracking sheets, environment checklist, and supplement protocols.",
    pages: 28,
    size: "1.5 MB",
    category: "Sleep",
    format: "PDF"
  },
  {
    id: 4,
    title: "Supplement Timing Guide",
    description: "Visual charts and schedules showing optimal timing for all major supplements throughout the day.",
    pages: 12,
    size: "800 KB",
    category: "Nutrition",
    format: "PDF"
  },
  {
    id: 5,
    title: "Workout Recovery Checklist",
    description: "Post-training recovery checklist with timing, techniques, and supplement recommendations.",
    pages: 8,
    size: "600 KB",
    category: "Recovery",
    format: "PDF"
  },
];

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "The Science of Sleep with Dr. Sarah Mitchell",
    description: "Deep dive into sleep architecture, circadian rhythms, and how to optimise your sleep quality naturally.",
    duration: "52:18",
    date: "Jan 12, 2026",
    guest: "Dr. Sarah Mitchell",
    category: "Sleep"
  },
  {
    id: 2,
    title: "Cold Therapy Protocols with Wim Hof",
    description: "Learn from the Iceman himself about cold exposure benefits, breathing techniques, and building mental resilience.",
    duration: "1:05:22",
    date: "Jan 5, 2026",
    guest: "Wim Hof",
    category: "Recovery"
  },
  {
    id: 3,
    title: "Optimising Brain Health Through Nutrition",
    description: "Expert nutritionist discusses foods, supplements, and lifestyle habits that enhance cognitive performance.",
    duration: "45:30",
    date: "Dec 28, 2025",
    guest: "Dr. James Chen",
    category: "Brain Health"
  },
  {
    id: 4,
    title: "Building an Elite Recovery Stack",
    description: "Professional athlete shares their complete recovery routine including supplements, devices, and protocols.",
    duration: "38:45",
    date: "Dec 20, 2025",
    guest: "Alex Rodriguez",
    category: "Recovery"
  },
];

export const MultiFormatHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");

  const filteredArticles = articles.filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGuides = guides.filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPodcasts = podcasts.filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="mb-20">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent -z-10 blur-2xl" />
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-accent/20">
            <BookOpen className="h-4 w-4" />
            <span>Multi-Format Learning</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
            Resource Library
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Get stuck into our complete library of articles, video tutorials, downloadable guides, and expert podcasts
          </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search all resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base bg-background/50 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-shadow"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-10 h-auto p-1.5 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="articles" className="gap-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-md">
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Articles</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="gap-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-md">
            <Video className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="gap-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-md">
            <FileText className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Guides</span>
          </TabsTrigger>
          <TabsTrigger value="podcasts" className="gap-2 py-4 data-[state=active]:bg-background data-[state=active]:shadow-md">
            <Headphones className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Podcasts</span>
          </TabsTrigger>
        </TabsList>

        {/* Articles Tab */}
        <TabsContent value="articles" className="animate-in fade-in slide-in-from-bottom-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video overflow-hidden bg-muted relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="shadow-sm">{article.category}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full group/btn hover:bg-primary/5">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos" className="animate-in fade-in slide-in-from-bottom-4">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-500 group border-border/50 hover:border-primary/30"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-4 right-4 bg-black/90 text-white px-3 py-1.5 shadow-lg">
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit mb-3 shadow-sm">{video.category}</Badge>
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {video.title}
                  </h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="animate-in fade-in slide-in-from-bottom-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-all duration-300 group border-dashed hover:border-solid">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{guide.category}</Badge>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{guide.format}</span>
                    <span>•</span>
                    <span>{guide.pages} pages</span>
                    <span>•</span>
                    <span>{guide.size}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group/btn">
                    <Download className="mr-2 h-4 w-4 group-hover/btn:-translate-y-1 transition-transform" />
                    Download Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Podcasts Tab */}
        <TabsContent value="podcasts" className="animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            {filteredPodcasts.map((podcast) => (
              <Card key={podcast.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Headphones className="h-10 w-10 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{podcast.category}</Badge>
                        <div className="flex items-center text-xs text-muted-foreground gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {podcast.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {podcast.duration}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {podcast.title}
                      </h3>
                      {podcast.guest && (
                        <p className="text-sm text-muted-foreground mb-2">
                          with {podcast.guest}
                        </p>
                      )}
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {podcast.description}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Play className="mr-2 h-3 w-3" />
                          Listen Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Show Notes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {((activeTab === 'articles' && filteredArticles.length === 0) ||
        (activeTab === 'videos' && filteredVideos.length === 0) ||
        (activeTab === 'guides' && filteredGuides.length === 0) ||
        (activeTab === 'podcasts' && filteredPodcasts.length === 0)) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No resources found matching your search.</p>
        </div>
      )}
    </section>
  );
};