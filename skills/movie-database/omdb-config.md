# OMDb API Configuration

## Get Your API Key

1. Visit: https://www.omdbapi.com/apikey.aspx
2. Sign up for free
3. Copy your API key

## Store Your API Key

### Option 1: Environment Variable (Recommended)
```bash
export OMDB_API_KEY="your_api_key_here"
```

Add to `~/.zshrc` or `~/.bashrc`:
```bash
echo 'export OMDB_API_KEY="your_actual_api_key"' >> ~/.zshrc
source ~/.zshrc
```

### Option 2: In This Config File
Copy your key below and chmod it:
```bash
chmod 600 omdb-config.sh
```

### Option 3: Create a Key Store
```
~/.movie-database-api-key
```

## Usage Examples

```bash
# Search for movies
curl "http://www.omdbapi.com/?s=Wes%20Anderson&apikey=YOUR_KEY"

# Get movie details
curl "http://www.omdbapi.com/?i=tt2278388&apikey=YOUR_KEY"

# Get movie by title
curl "http://www.omdbapi.com/?t=The%20Grand%20Budapest%20Hotel&apikey=YOUR_KEY"
```

## Rate Limits
- Free tier: 1000 requests/day
- Remove limit with optional donation
- Typical search is 1 request
- Getting details is 1 request

---

**🔒 Keep your API key secure! Never commit it to git.**

### To Test the Integration
```bash
cd skills/movie-database
./omdb-test
```

**What I need from you:**
1. Your OMDb API key (or I can create the key store for you to fill in)
2. I'll set up the integration automatically!