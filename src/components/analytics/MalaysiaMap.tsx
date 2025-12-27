'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StateViewers } from '@/data/analyticsData';

interface MalaysiaMapProps {
  data: StateViewers[];
}

// Map state codes to SVG element IDs
const stateCodeToSvgId: Record<string, string> = {
  'SGR': 'MY10',
  'JHR': 'MY01',
  'SBH': 'MY12',
  'SWK': 'MY13',
  'PRK': 'MY08',
  'PNG': 'MY07',
  'KDH': 'MY02',
  'KTN': 'MY03',
  'PHG': 'MY06',
  'TRG': 'MY11',
  'NSN': 'MY05',
  'MLK': 'MY04',
  'PLS': 'MY09',
  'KUL': 'MY14',
};

// Get color based on percentage (heatmap)
function getHeatmapColor(percentage: number): string {
  const maxPercentage = 25;
  const intensity = Math.min(percentage / maxPercentage, 1);

  if (intensity > 0.7) return '#E63946';
  if (intensity > 0.5) return '#C62B38';
  if (intensity > 0.3) return '#A31D2A';
  if (intensity > 0.15) return '#7A1520';
  return '#4A0D14';
}

export default function MalaysiaMap({ data }: MalaysiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const dataMap = new Map(data.map(d => [d.stateCode, d]));
  const hoveredData = hoveredState ? dataMap.get(hoveredState) : null;

  // Fetch and process SVG
  useEffect(() => {
    fetch('/malaysia-map.svg')
      .then(res => res.text())
      .then(svg => {
        setSvgContent(svg);
      });
  }, []);

  // Apply colors and interactivity to SVG paths
  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Style the SVG
    svgElement.style.width = '100%';
    svgElement.style.height = 'auto';
    svgElement.style.maxHeight = '300px';

    // Process each state path
    Object.entries(stateCodeToSvgId).forEach(([stateCode, svgId]) => {
      const path = svgElement.querySelector(`#${svgId}`) as SVGPathElement;
      if (!path) return;

      const stateData = dataMap.get(stateCode);
      const color = stateData ? getHeatmapColor(stateData.percentage) : '#2A2A2A';

      // Apply styles
      path.style.fill = color;
      path.style.stroke = '#0A0A0A';
      path.style.strokeWidth = '0.5';
      path.style.cursor = 'pointer';
      path.style.transition = 'all 0.2s ease';

      // Add hover events
      path.onmouseenter = () => {
        setHoveredState(stateCode);
        path.style.filter = 'brightness(1.4) drop-shadow(0 0 8px rgba(230, 57, 70, 0.5))';
        path.style.stroke = '#fff';
        path.style.strokeWidth = '1';
      };
      path.onmouseleave = () => {
        setHoveredState(null);
        path.style.filter = 'none';
        path.style.stroke = '#0A0A0A';
        path.style.strokeWidth = '0.5';
      };
    });
  }, [svgContent, dataMap]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Viewers by State</h3>
        <p className="text-gdc-gray text-sm">Geographic distribution across Malaysia</p>
      </div>

      <div className="relative">
        {/* SVG Map Container */}
        <div
          ref={containerRef}
          className="w-full flex justify-center items-center min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Hover Tooltip */}
        {hoveredData && (
          <div className="absolute top-4 right-4 bg-gdc-dark-lighter border border-white/20 rounded-lg px-4 py-3 shadow-xl z-10">
            <p className="text-white font-bold">{hoveredData.state}</p>
            <p className="text-gdc-red text-lg font-bold">{hoveredData.viewers.toLocaleString()}</p>
            <p className="text-gdc-gray text-sm">viewers ({hoveredData.percentage.toFixed(1)}%)</p>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-gdc-gray text-xs">Low</span>
          <div className="flex rounded overflow-hidden">
            {['#4A0D14', '#7A1520', '#A31D2A', '#C62B38', '#E63946'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-3"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-gdc-gray text-xs">High</span>
        </div>

        {/* Top 5 States List */}
        <div className="mt-6 space-y-2">
          <p className="text-gdc-gray text-xs uppercase tracking-wider mb-3">Top States</p>
          {data.slice(0, 5).map((state) => (
            <div
              key={state.stateCode}
              className={`flex items-center justify-between text-sm py-1 px-2 rounded transition-colors ${
                hoveredState === state.stateCode ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              onMouseEnter={() => setHoveredState(state.stateCode)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getHeatmapColor(state.percentage) }}
                />
                <span className="text-white">{state.state}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gdc-gray">{state.viewers.toLocaleString()}</span>
                <span className="text-gdc-red font-medium w-12 text-right">
                  {state.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
