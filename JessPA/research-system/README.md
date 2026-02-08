# Research Agent Team - Multi-Agent Research System

## Overview
A specialized multi-agent system for conducting thorough research with rigorous fact-checking and professional reporting.

## Architecture
- **4 Coordinated Agents** working in parallel with proper task allocation
- **Grok 4.1 Fast** (2M token context) for all agents
- **3-Phase Workflow** for comprehensive research
- **Professional Markdown** output with APA citations

## Agent Roles

### 1. Research Orchestrator
- **Responsibilities**: Task allocation, workflow management, quality oversight
- **Model**: Grok 4.1 Fast with 500K token limit
- **Output**: Coordination plan and final report synthesis

### 2. Source Gatherer
- **Responsibilities**: Web searches, source extraction, data collection
- **Model**: Grok 4.1 Fast with 200K token limit  
- **Output**: Raw source data and research findings

### 3. Fact Checker
- **Responsibilities**: Source credibility assessment, claim verification, cross-reference
- **Model**: Grok 4.1 Fast with 200K token limit
- **Output**: Verification report with credibility scores

### 4. Report Author
- **Responsibilities**: Professional report synthesis, citation integration, quality assurance
- **Model**: Grok 4.1 Fast with 400K token limit
- **Output**: Final professional report in Markdown format

## Usage

### Basic Research Request
```
research-team "Research topic: ERC-8004 Ethereum protocol"
```

### Comprehensive Research
```
research-team --task "Research ERC-8004" --depth "comprehensive" --duration "2 hours"
```

### Detailed Research Parameters
```
research-team \
  --task "Research x402 payment protocol" \
  --depth "exhaustive" \
  --focus "architecture, ecosystem, integration" \
  --sources 15 \
  --sources-type "primary,secondary,technical" \
  --confidence-level "high" \
  --format "markdown" \
  --cite-style "APA" \
  --save-drive "true" \
  --project-name "x402-protocol"
```

## Workflow

### Phase 1: Initial Data Collection (10-15 min)
1. Orchestrator allocates research tasks
2. Source Gatherer performs parallel web searches
3. Multiple searches in parallel to gather breadth
4. Sources collected: URL, title, author, date, key findings

### Phase 2: Deep Analysis & Verification (15-20 min)
1. Fact Checker validates source credibility
2. Cross-references claims across sources
3. Checks for conflicts and discrepancies
4. Calculates confidence scores
5. Identifies primary vs secondary sources

### Phase 3: Report Synthesis (10-15 min)
1. Report Author synthesizes verified findings
2. Structures report with professional format
3. Integrates inline APA citations
4. Adds confidence ratings and limitations
5. Final quality assurance review

## Output Structure

```
JessPA/research/{project_date}/
├── sources/           # Collected source files
│   ├── source_001.json
│   └── source_002.json
├── findings/          # Research findings
│   ├── research_findings.json
│   └── verification_report.json
├── reports/           # Final reports
│   └── final_report.md
└── metadata/          # Session metadata
    ├── session_001.json
    ├── timeline.json
    └── metrics.json
```

## Report Standards

### Required Sections
1. **Executive Summary**: Brief overview of findings
2. **Methodology**: Research approach and sources
3. **Key Findings**: Detailed findings with inline APA citations
4. **Cross-Reference Analysis**: Consensus and conflicts
5. **Limitations & Caveats**: Gaps and biases
6. **References**: Complete APA-formatted reference list

### Citation Requirements
- **Minimum 3 citations per claim**
- **Primary sources**: 40% minimum
- **APA format**
- **Confidence ratings** for major findings
- **Source URLs** with full details

## Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Source Quality | >0.7 | Credibility scoring |
| Claim Verification | 2-3 corroboration | Cross-source validation |
| Citation Density | 3+ per claim | In-text citations |
| Formatting | Professional | Markdown standards |
| Confidence | >70% | Overall confidence score |

## Project Folder Structure

### Recommended Directory Hierarchy
```
JessPA/
├── research/              # All research projects
│   ├── {topic_name}/{project_date}/
│   │   ├── sources/
│   │   ├── findings/
│   │   ├── reports/
│   │   └── metadata/
├── research-system/       # System configuration
│   ├── agents/
│   ├── sessions/
│   ├── outputs/
│   └── config/
└── memory/                # Long-term memory
```

## Features

### Real-Time Research
- Parallel source gathering
- Instant fact-checking
- Live progress updates

### Rigorous Verification
- Multiple source validation
- Credibility scoring
- Conflict resolution

### Professional Reporting
- Academic-style format
- Comprehensive citations
- Confidence ratings

### Automatic Organization
- Project folder creation
- Session tracking
- Drive synchronization

## Integration with Drive

### Auto-Save to Drive
```yaml
drive_sync: true
project_folder: "JessPA/{topic}"
```

### Manual Upload
```bash
gog drive upload JessPA/research/{project}/*.md
```

## Limitations

### Token Management
- Max 2M tokens per agent (Grok 4.1 Fast)
- 50 searches per session (respects rate limits)
- Output truncation at 10K words

### Research Scope
- Cannot verify live data in real-time
- Subject to API rate limits
- Some sources may be paywalled or geo-restricted

## Future Enhancements

- Machine learning for optimal agent allocation
- Custom agent templates
- Advanced metrics and analytics
- Real-time collaboration features
- Custom citation styles

## Support

For issues or questions:
1. Check configuration: `JessPA/research-system/research-team-config.yaml`
2. Review session logs: `JessPA/research-system/sessions/`
3. Examine intermediate outputs: `JessPA/research/{project}/findings/`

---

**Version:** 1.1  
**Last Updated:** February 8, 2026  
**Author:** OpenClaw Research Team  
**Model:** Grok 4.1 Fast (2M context)