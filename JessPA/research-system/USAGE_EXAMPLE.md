# Research Team Usage Examples

## Example 1: Basic Research Request

### Task
```
Research the x402 payments protocol from Coinbase
```

### Expected Workflow
1. **Orchestrator** creates task allocation plan
2. **Source Gatherer** spawns and performs 8 parallel searches
3. **Fact Checker** spawns and validates claims
4. **Report Author** spawns and synthesizes final report

### Expected Output
```
JessPA/research/x402-protocol-2026-02-08/
├── sources/
│   ├── source_001.json  # Coinbase official docs
│   ├── source_002.json  # GitHub repository
│   ├── source_003.json  # Official website
│   ├── source_004.json  # FAQ documentation
│   ├── source_005.json  # Cloudflare blog
│   └── ... (up to 12 sources)
├── findings/
│   ├── research_findings.json
│   └── verification_report.json
├── reports/
│   └── final_report.md
└── metadata/
    ├── session_001.json
    ├── timeline.json
    └── metrics.json
```

### Report Format
```markdown
# x402: Internet-Native Payments Protocol

**Executive Summary**
Brief 2-sentence overview with key conclusion.

**Methodology**
- Sources collected: 12
- Primary sources: 5
- Cross-referenced: Yes
- Confidence: 0.92

**Key Findings**

**1. Core Concept**
x402 revitalizes HTTP 402 "Payment Required" status code to enable instant stablecoin payments over HTTP [1][2][3].

   **Evidence:** 
   - Source 1: Official Coinbase documentation [https://docs.cdp.coinbase.com/x402/welcome]
   - Source 2: GitHub repository with implementation details [https://github.com/coinbase/x402]
   - Source 3: Official FAQ [https://x402.gitbook.io/x402/faq]
   
   **Confidence:** High - Multiple authoritative sources corroborate [1][2][3]

**2. Technical Implementation**
The protocol uses a simple HTTP 402 response with PAYMENT-REQUIRED header containing payment instructions. The client then constructs and signs a payment payload and retries the request with PAYMENT-SIGNATURE header [1][4].

   **Evidence:**
   - Source 1: Coinbase docs [https://docs.cdp.coinbase.com/x402/welcome]
   - Source 4: Cloudflare blog details flow [https://blog.cloudflare.com/x402/]
   
   **Confidence:** High - Consistent across documentation

**Cross-Reference Analysis**
- **Consensus:** Core HTTP 402 flow verified across 5 sources
- **Conflicts:** Minimal - only minor variations in implementation details
- **Primary Sources:** Coinbase documentation (3 sources)
- **Confidence Score:** 0.92

**Limitations & Caveats**
- Protocol is relatively new (announced Dec 2025)
- Facilitator service currently centralized with Coinbase
- Not yet widely adopted outside major partnerships

**References**

Coinbase Developer Platform. (2025). *Welcome to x402* [Documentation]. https://docs.cdp.coinbase.com/x402/welcome

Coinbase. (2025). *x402 on GitHub* [Repository]. https://github.com/coinbase/x402

Coinbase. (2025). *x402 FAQ* [Documentation]. https://x402.gitbook.io/x402/faq

Cloudflare. (2025, December 3). *Launching the x402 Foundation with Coinbase* [Blog post]. https://blog.cloudflare.com/x402/

Quicknode. (2025). *How to use x402 Payment Protocol* [Guide]. https://www.quicknode.com/guides/infrastructure/how-to-use-x402-payment-required

Developer Tech. (2025, August 21). *Coinbase x402 enables instant stablecoin payments* [News article]. https://www.developer-tech.com/news/coinbase-x402-enables-instant-stablecoin-payments-over-http/

Backpack Exchange. (2025). *What is x402?* [Educational article]. https://learn.backpack.exchange/articles/what-is-x402

--- 

**Report Metrics:**
- Research Duration: 35 minutes
- Sources Collected: 12
- Claims Verified: 15
- Citations: 45+
- Overall Confidence: 0.92

**Report Prepared By:** Research Agent Team  
**Session ID:** x402-2026-02-08-001  
**Credibility Score:** High
```

## Example 2: Complex Research

### Task
```
Comprehensive research on ERC-8004 Ethereum protocol with:
- Primary focus: Trustless Agents standard
- Secondary focus: Integration with other protocols (x402, A2A)
- Tertiary focus: Practical implementation considerations
- Confidence level: Very High
```

### Advanced Parameters
```yaml
task: "Comprehensive research on ERC-8004"
depth: "exhaustive"
focus: "trustless agents, x402 integration, a2a protocol, implementation"
sources: 20
sources_type: ["primary", "secondary", "technical", "academic"]
confidence_level: "very_high"
cite_style: "APA"
format: "markdown"
save_drive: true
project_name: "erc-8004-trustless-agents"
```

### Multi-Agent Workflow
1. **Orchestrator** creates detailed task breakdown:
   - 4 source gathering teams (for parallel searches)
   - 2 fact-checking teams (for different claim types)
   - 2 report synthesis teams (different sections)
   
2. **Source Gatherer Agents** collect:
   - Ethereum EIP documents (primary)
   - Academic papers and research (academic)
   - Implementation guides and tutorials (technical)
   - Industry analysis and news (secondary)
   
3. **Fact Checker Agents** perform:
   - Source credibility assessment
   - Technical claim verification
   - Cross-protocol integration validation
   - Consistency checking
   
4. **Report Author Agents** create:
   - Executive summary
   - Technical deep-dive
   - Integration analysis
   - Implementation guide
   - References and appendices

## Example 3: Time-Critical Research

### Task
```
Urgent research on yesterday's regulatory developments in crypto payments
```

### Parameters
```yaml
task: "Latest crypto payment regulations"
depth: "light"  # Faster than normal
confidence_level: "medium"
sources: 8
sources_freshness: "past_24h"
focus: "regulatory developments, compliance, recent news"
save_drive: true
project_name: "crypto-payments-regulations-2026-02-07"
```

### Fast Workflow
1. Orchestrator uses light-depth approach
2. 4 source gatherer agents (parallel)
3. 1 fact-checker agent (quick verification)
4. 1 report author agent (fast synthesis)
5. Total time: 15-20 minutes

## Integration with Drive

### Auto-Save Configuration
```yaml
drive_sync: true
project_folder: "JessPA/research"
auto_upload: true
upload_schedule: "end_of_session"
```

### Manual Upload Commands
```bash
# List all research projects
gog drive ls "JessPA/research/"

# Upload entire project
gog drive upload "JessPA/research/x402-protocol-2026-02-08"/*.md

# Search in research folder
gog drive search "ERC-8004" "JessPA/research/"

# Get specific file
gog drive get "1aTZRwJLbwJTO8XrG1pKBpmAlHEc1hhBN"
```

## Quality Assurance Checklist

### Before Sending to User
- [ ] All sections present (6 required)
- [ ] APA citations properly formatted
- [ ] Confidence ratings added
- [ ] Limitations acknowledged
- [ ] References complete with URLs
- [ ] Markdown formatting correct
- [ ] At least 8 sources collected
- [ ] At least 3 citations per claim
- [ ] Source credibility >0.7
- [ ] Cross-reference analysis complete
- [ ] Drive sync successful

### Post-Research Review
- [ ] All claims verified?
- [ ] Conflicts resolved or noted?
- [ ] Primary sources prioritized?
- [ ] Formatting consistent?
- [ ] No duplicate content?
- [ ] Clear section headings?
- [ ] Professional tone maintained?

## Example Research Session

### Session Timeline
```
11:00 - 11:05  Phase 1: Source Gathering (Orchestrator + 4 Source Gatherers)
11:05 - 11:15  Phase 2: Verification (2 Fact Checkers)
11:15 - 11:25  Phase 3: Synthesis (2 Report Authors)
11:25 - 11:30  Phase 4: Final Review (Orchestrator + Fact Checker)
11:30 - 11:35  Phase 5: Drive Upload & Summary

Total: 35 minutes
```

### Output Files Generated
```
JessPA/research/x402-protocol-2026-02-08/
├── sources/
│   ├── source_001.json (11:02)
│   ├── source_002.json (11:03)
│   ├── source_003.json (11:03)
│   ├── source_004.json (11:04)
│   ├── source_005.json (11:05)
│   ├── source_006.json (11:05)
│   ├── source_007.json (11:06)
│   └── source_008.json (11:06)
├── findings/
│   ├── research_findings.json (11:10)
│   └── verification_report.json (11:12)
├── reports/
│   ├── final_report.md (11:20)
│   └── draft_01.md (11:15)
└── metadata/
    ├── session_001.json (11:00)
    ├── timeline.json (11:30)
    ├── metrics.json (11:30)
    └── quality_scores.json (11:25)

Upload to Drive: 11:32 - 11:35 (3 minutes)
```

---

**Note:** Always review intermediate outputs before final synthesis. Report Author can iterate multiple times based on Fact Checker feedback.