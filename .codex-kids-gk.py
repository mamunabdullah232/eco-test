from pathlib import Path
import base64
import json
import zlib

ROOT = Path(__file__).resolve().parent
PAYLOAD = ROOT / ".codex-kids-gk-payload.txt"
WORKFLOW = ROOT / ".github/workflows/codex-kids-gk.yml"

files = json.loads(zlib.decompress(base64.b64decode(PAYLOAD.read_text(encoding="utf-8").strip())).decode("utf-8"))
for item in files:
    target = ROOT / item["path"]
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(item["content"], encoding="utf-8")

index_path = ROOT / "index.html"
html = index_path.read_text(encoding="utf-8")

if "function isKidsGkSection" not in html:
    html = html.replace(
        '''function isKidsEnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "kids__english-grammar__english-grammar";
}
''',
        '''function isKidsEnglishGrammarSection(parts){
  return parts.map(slugify).join("__") === "kids__english-grammar__english-grammar";
}

function isKidsGkSection(parts){
  return parts.map(slugify).join("__") === "kids__gk__gk";
}
'''
    )

if "function kidsGkTestFile" not in html:
    html = html.replace(
        '''function kidsEnglishGrammarTestFile(test){
  return "mock-tests/kids/english-grammar/test-" + getNumberFromLabel(test) + ".json";
}
''',
        '''function kidsEnglishGrammarTestFile(test){
  return "mock-tests/kids/english-grammar/test-" + getNumberFromLabel(test) + ".json";
}

function kidsGkTestFile(test){
  return "mock-tests/kids/gk/test-" + getNumberFromLabel(test) + ".json";
}
'''
    )

if "kidsGkTestFile(test)" not in html:
    html = html.replace(
        '''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
''',
        '''  if(isKidsEnglishGrammarSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsEnglishGrammarTestFile(test));
  }
  if(isKidsGkSection(parts)){
    return "mock-test.html?file=" + encodeURIComponent(kidsGkTestFile(test));
  }
'''
    )

if "if(isKidsGkSection(parts)){\n    return /^Test [1-5]$/.test(labelEn(test));" not in html:
    html = html.replace(
        '''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
''',
        '''  if(isKidsEnglishGrammarSection(parts)){
    return /^Test [1-3]$/.test(labelEn(test));
  }
  if(isKidsGkSection(parts)){
    return /^Test [1-5]$/.test(labelEn(test));
  }
'''
    )

required = [
    "function isKidsGkSection",
    "function kidsGkTestFile",
    "kidsGkTestFile(test)",
    "isKidsGkSection(parts)",
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit("Index patch failed: " + ", ".join(missing))

index_path.write_text(html, encoding="utf-8")
PAYLOAD.unlink()
Path(__file__).unlink()
if WORKFLOW.exists():
    WORKFLOW.unlink()
