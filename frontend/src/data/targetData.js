const targetData = {
  temperature: [
    {x: 9, y: -5},
    {x: 10, y: - 4},
    {x: 11, y: -2},
    {x: 12, y: -1},
    {x: 13, y: 1},
    {x: 14, y: 1}
  ],
  waveMaxHeight: [
    {x: 9, y: 7.2},
    {x: 10, y: 8.1},
    {x: 11, y: 8.5},
    {x: 12, y: 8.1},
    {x: 12, y: 7.7},
    {x: 13, y: 7.9},
    {x: 14, y: 7.1},
    {x: 15, y: 0}
  ],
  waveAvgHeight: [
    {x: 9, y: 6.5},
    {x: 10, y: 6.3},
    {x: 11, y: 6.4},
    {x: 12, y: 6.6},
    {x: 12, y: 6.5},
    {x: 13, y: 6.6},
    {x: 14, y: 6.2},
    {x: 15, y: 0}
  ],
  wavePeriod: [
    {x: 9, y: 8},
    {x: 10, y: 7},
    {x: 11, y: 8},
    {x: 12, y: 7},
    {x: 12, y: 6},
    {x: 13, y: 5},
    {x: 14, y: 8}
  ],
  riskAreas: [
    {N: 1, NE: 0, E: 0, SE: 0, S: 0, SW: 0, W: 3, NW: 7},
    {N: 0, NE: 10, E: 2, SE: 0, S: 0, SW: 0, W: 0, NW: 0}
  ],
  riskDirections: [
    {name: 'N', domain: [0, 10]},
    {name: 'NW', domain: [0, 10]},
    {name: 'W', domain: [0, 10]},
    {name: 'SW', domain: [0, 10]},
    {name: 'S', domain: [0, 10]},
    {name: 'SE', domain: [0, 10]},
    {name: 'E', domain: [0, 10]},
    {name: 'NE', domain: [0, 10]},
  ]
}

export default targetData
