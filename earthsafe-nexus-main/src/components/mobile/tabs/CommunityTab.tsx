import { useState } from "react"
import { Users, Plus, MessageCircle, Clock, AlertCircle, Heart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockCommunityPosts } from "@/lib/mock-data"

export function CommunityTab() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'help_request' | 'help_offer' | 'sos' | 'information'>('all')
  const [newPost, setNewPost] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    priority: 'normal'
  })

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting community post:', newPost)
    setNewPost({
      type: '',
      title: '',
      description: '',
      location: '',
      priority: 'normal'
    })
    alert('Post submitted successfully!')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'help_request':
        return <AlertCircle className="h-4 w-4" />
      case 'help_offer':
        return <Heart className="h-4 w-4" />
      case 'sos':
        return <AlertCircle className="h-4 w-4" />
      case 'information':
        return <Info className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'help_request':
        return 'border-warning text-warning'
      case 'help_offer':
        return 'border-safe text-safe'
      case 'sos':
        return 'border-danger text-danger'
      case 'information':
        return 'border-info text-info'
      default:
        return 'border-muted text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-danger text-danger-foreground'
      case 'high':
        return 'bg-warning text-warning-foreground'
      case 'normal':
        return 'bg-info text-info-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const filteredPosts = activeFilter === 'all' 
    ? mockCommunityPosts 
    : mockCommunityPosts.filter(post => post.type === activeFilter)

  return (
    <div className="h-full flex flex-col">
      {/* Header with Filter and New Post */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Board
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Create Community Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-type">Post Type</Label>
                  <Select 
                    value={newPost.type} 
                    onValueChange={(value) => setNewPost({...newPost, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select post type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="help_request">Help Request</SelectItem>
                      <SelectItem value="help_offer">Help Offer</SelectItem>
                      <SelectItem value="sos">SOS</SelectItem>
                      <SelectItem value="information">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-priority">Priority</Label>
                  <Select 
                    value={newPost.priority} 
                    onValueChange={(value) => setNewPost({...newPost, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-title">Title</Label>
                  <Input
                    id="post-title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Brief title for your post"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-description">Description</Label>
                  <Textarea
                    id="post-description"
                    value={newPost.description}
                    onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    placeholder="Detailed description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-location">Location</Label>
                  <Input
                    id="post-location"
                    value={newPost.location}
                    onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                    placeholder="Location"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Post to Community
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          <Button
            variant={activeFilter === 'help_request' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('help_request')}
          >
            Help Needed
          </Button>
          <Button
            variant={activeFilter === 'help_offer' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('help_offer')}
          >
            Offering Help
          </Button>
          <Button
            variant={activeFilter === 'sos' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('sos')}
          >
            SOS
          </Button>
          <Button
            variant={activeFilter === 'information' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('information')}
          >
            Info
          </Button>
        </div>

        {/* BLE Mesh Status */}
        <div className="bg-info/10 border border-info/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-safe rounded-full animate-pulse"></div>
            <span className="text-info-foreground">
              BLE Mesh Network: Connected to 12 nearby devices
            </span>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(post.type)}
                  <CardTitle className="text-base">{post.title}</CardTitle>
                </div>
                <Badge className={getPriorityColor(post.priority)}>
                  {post.priority.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>by {post.author}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(post.timestamp)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getTypeColor(post.type)}>
                  {post.type.replace('_', ' ').toUpperCase()}
                </Badge>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.responses} responses</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Respond
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-muted-foreground">No Posts Found</h3>
            <p className="text-sm text-muted-foreground">Be the first to share with your community!</p>
          </div>
        )}
      </div>
    </div>
  )
}