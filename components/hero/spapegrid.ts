interface Shape {
  type: null | 'ShSquare' | 'ShCircle' | 'ShTriangle' | 'ShQuarterCircle'
  rotation?: '0' | '90' | '-90' | '180'
  color?: 'primary' | 'secondary' | 'offblue' | 'gray' | 'blue'
}

export const shapes: Shape[] = [
  // Row 1
  { type: null },
  { type: 'ShTriangle', color: 'primary' },
  { type: null },
  { type: null },
  { type: null },
  { type: null },

  // Row 2
  { type: null },
  { type: null },
  { type: 'ShQuarterCircle', color: 'offblue' },
  { type: 'ShTriangle', color: 'secondary', rotation: '-90' },
  { type: null },
  { type: 'ShTriangle', color: 'primary' },

  // Row 3
  { type: null },
  { type: 'ShSquare', color: 'blue' },
  { type: 'ShQuarterCircle', color: 'secondary' },
  { type: 'ShQuarterCircle', color: 'blue' },
  { type: 'ShQuarterCircle', color: 'primary' },
  { type: null },

  // Row 4
  { type: 'ShQuarterCircle', color: 'offblue' },
  { type: 'ShCircle', color: 'secondary' },
  { type: null },
  { type: 'ShSquare', color: 'gray' },
  { type: null },
  { type: null },

  // Row 5
  { type: null },
  { type: 'ShTriangle', color: 'gray' },
  { type: 'ShQuarterCircle', color: 'primary', rotation: '90' },
  { type: null },
  { type: 'ShTriangle', color: 'blue', rotation: '90' },
  { type: null },

  // Row 6
  { type: null },
  { type: null },
  { type: 'ShTriangle', color: 'secondary', rotation: '90' },
  { type: null },
  { type: null },
  { type: null }
]
