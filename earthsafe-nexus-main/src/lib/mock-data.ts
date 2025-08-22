// Mock data for EcoSentinel platform

export interface Alert {
  id: string
  type: 'flood' | 'cyclone' | 'landslide' | 'wildfire' | 'earthquake'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  location: string
  timestamp: string
  coordinates: [number, number]
  affectedAreas: string[]
  safeRoutes?: string[]
}

export interface CitizenReport {
  id: string
  type: 'incident' | 'damage' | 'help_needed' | 'road_closure'
  title: string
  description: string
  location: string
  coordinates: [number, number]
  severity: 'critical' | 'high' | 'medium' | 'low'
  timestamp: string
  photo?: string
  status: 'pending' | 'verified' | 'resolved'
  reportedBy: string
}

export interface CommunityPost {
  id: string
  type: 'help_request' | 'help_offer' | 'sos' | 'information'
  title: string
  description: string
  location: string
  timestamp: string
  author: string
  priority: 'urgent' | 'high' | 'normal'
  status: 'open' | 'closed'
  responses: number
}

export interface Shelter {
  id: string
  name: string
  address: string
  coordinates: [number, number]
  capacity: number
  currentOccupancy: number
  amenities: string[]
  contact: string
  status: 'open' | 'full' | 'closed'
}

export interface RiskZone {
  id: string
  type: 'flood' | 'cyclone' | 'landslide' | 'wildfire'
  severity: number // 0-1 scale
  coordinates: [number, number][]
  lastUpdated: string
}

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'critical',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall expected to cause flash flooding in low-lying areas. Immediate evacuation recommended.',
    location: 'Downtown Manila',
    timestamp: '2024-01-20T10:30:00Z',
    coordinates: [121.0244, 14.5994],
    affectedAreas: ['Malate', 'Ermita', 'Paco'],
    safeRoutes: ['EDSA Route', 'C5 Bypass', 'Skyway Alternative']
  },
  {
    id: '2',
    type: 'cyclone',
    severity: 'high',
    title: 'Typhoon Approaching',
    description: 'Category 3 typhoon expected to make landfall in 12 hours. Strong winds and heavy rain forecast.',
    location: 'Bataan Province',
    timestamp: '2024-01-20T08:15:00Z',
    coordinates: [120.4037, 14.6417],
    affectedAreas: ['Balanga', 'Mariveles', 'Bagac'],
    safeRoutes: ['Inland Route via SCTEX', 'Northern Evacuation Route']
  },
  {
    id: '3',
    type: 'landslide',
    severity: 'medium',
    title: 'Landslide Risk Alert',
    description: 'Unstable soil conditions detected. Residents in hillside areas advised to stay alert.',
    location: 'Baguio City',
    timestamp: '2024-01-20T06:45:00Z',
    coordinates: [120.5960, 16.4023],
    affectedAreas: ['Session Road', 'Camp 7', 'Teachers Camp'],
    safeRoutes: ['Kennon Road Alternative', 'Marcos Highway']
  }
]

// Mock citizen reports
export const mockReports: CitizenReport[] = [
  {
    id: '1',
    type: 'incident',
    title: 'Tree Down Blocking Road',
    description: 'Large tree fell across Aurora Boulevard near EDSA intersection, completely blocking traffic.',
    location: 'Aurora Boulevard, Quezon City',
    coordinates: [121.0437, 14.6042],
    severity: 'high',
    timestamp: '2024-01-20T09:30:00Z',
    status: 'verified',
    reportedBy: 'Juan Cruz'
  },
  {
    id: '2',
    type: 'damage',
    title: 'Flooded Underpass',
    description: 'Katipunan underpass is completely flooded, water level approximately 3 feet deep.',
    location: 'Katipunan Avenue, Quezon City',
    coordinates: [121.0723, 14.6760],
    severity: 'critical',
    timestamp: '2024-01-20T08:45:00Z',
    status: 'pending',
    reportedBy: 'Maria Santos'
  },
  {
    id: '3',
    type: 'help_needed',
    title: 'Family Stranded on Rooftop',
    description: 'Family of 5 including elderly and children stranded on rooftop due to rising flood waters.',
    location: 'Marikina Riverbanks',
    coordinates: [121.1025, 14.6507],
    severity: 'critical',
    timestamp: '2024-01-20T10:15:00Z',
    status: 'pending',
    reportedBy: 'Pedro Dela Cruz'
  }
]

// Mock community posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    type: 'help_offer',
    title: 'Offering Transport to Evacuation Center',
    description: 'I have a truck available to help transport families to safer areas. Can accommodate up to 15 people.',
    location: 'Pasig City',
    timestamp: '2024-01-20T09:00:00Z',
    author: 'Mike Gonzales',
    priority: 'high',
    status: 'open',
    responses: 12
  },
  {
    id: '2',
    type: 'help_request',
    title: 'Need Medicine for Diabetic Patient',
    description: 'Urgently need insulin and diabetes medication. Patient is in evacuation center at Rizal Elementary.',
    location: 'Rizal Elementary School',
    timestamp: '2024-01-20T10:20:00Z',
    author: 'Anna Rodriguez',
    priority: 'urgent',
    status: 'open',
    responses: 3
  },
  {
    id: '3',
    type: 'information',
    title: 'Marikina Evacuation Center Status',
    description: 'Marikina Sports Center is now at 80% capacity. Still accepting evacuees but space is limited.',
    location: 'Marikina Sports Center',
    timestamp: '2024-01-20T08:30:00Z',
    author: 'Barangay Captain Torres',
    priority: 'normal',
    status: 'open',
    responses: 7
  }
]

// Mock shelters data
export const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Rizal Memorial Sports Complex',
    address: 'Pablo Ocampo St, Malate, Manila',
    coordinates: [120.9932, 14.5648],
    capacity: 500,
    currentOccupancy: 320,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water'],
    contact: '+63 2 8523 4567',
    status: 'open'
  },
  {
    id: '2',
    name: 'Marikina Sports Center',
    address: 'Shoe Ave, Marikina City',
    coordinates: [121.1025, 14.6507],
    capacity: 1000,
    currentOccupancy: 800,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water', 'Children Area'],
    contact: '+63 2 8941 2345',
    status: 'open'
  },
  {
    id: '3',
    name: 'Quezon City Convention Center',
    address: 'Commonwealth Avenue, Quezon City',
    coordinates: [121.0437, 14.6760],
    capacity: 750,
    currentOccupancy: 750,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power'],
    contact: '+63 2 8372 1234',
    status: 'full'
  }
]

// Mock risk zones for heatmap
export const mockRiskZones: RiskZone[] = [
  {
    id: '1',
    type: 'flood',
    severity: 0.9,
    coordinates: [
      [121.0180, 14.5950],
      [121.0280, 14.5950],
      [121.0280, 14.6050],
      [121.0180, 14.6050]
    ],
    lastUpdated: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    type: 'landslide',
    severity: 0.7,
    coordinates: [
      [120.5900, 16.3980],
      [120.6000, 16.3980],
      [120.6000, 16.4080],
      [120.5900, 16.4080]
    ],
    lastUpdated: '2024-01-20T09:30:00Z'
  }
]

// Mock dashboard metrics
export const mockDashboardMetrics = {
  activeAlerts: 23,
  citizenReports: 127,
  highRiskZones: 8,
  activeShelters: 15,
  evacuatedFamilies: 1240,
  availableShelterCapacity: 2500
}