# jev-roast

**Score copy against a declared rubric and anchor every weak mark to an exact sentence from the source.**

[![Tests](https://github.com/gbesse/jev-roast/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-roast/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · Zero runtime dependencies · Public alpha

Jev never writes the roast. Pass one returns typed scores; only weak dimensions trigger pass two, where Jev selects an original span. The report quotes the recorded substring byte-for-byte.

## Try it in 30 seconds

```sh
git clone https://github.com/gbesse/jev-roast.git && cd jev-roast
npm run demo
node bin/jev-roast.mjs run examples/sample.txt --pack landing-page --fake
```

Demo probabilities are synthetic, not measured Jev output.

## Call real Jev

```sh
export TYPESAFE_API_KEY=... # paid requests go to https://api.typesafe.ai/v1/systemone
node bin/jev-roast.mjs estimate copy.txt --pack landing-page
node bin/jev-roast.mjs run copy.txt --pack landing-page --html scorecard.html
```

Shipped packs cover landing pages, résumés, cover letters and product descriptions. `validate` accepts custom JSON packs. Library users can import `splitSpans`, `selectCandidates`, `roast`, `renderHtml`, and the providers. See [citation retrieval](docs/retrieval.md).

## How it decides

Every dimension exposes its exact instruction, weight and `weak_below`. Scores normalize to 0–1; the composite is a code-owned weighted mean. Weak dimensions ask a `choice` question over original spans (maximum 255). Deterministic retrieval ranks oversized documents before judgment. The output never paraphrases the source.

## Boundaries

This tool never rewrites copy or suggests replacements. It is a rubric-based critique aid, not an editor or calibrated benchmark. A dimension with no citation scored above its configured threshold. Jev reads literally, can be swayed by injected text, and is weak at counting, dates and arithmetic; code handles offsets and weighting. English works best.

## Shareable demo report

Run `npm run demo:report` to capture this repository’s bundled example as one JSON object with the project purpose, version and complete demo output. The command fails if the demo fails, so the report is useful when sharing a reproducible first look or reporting unexpected behavior. The bundled demo’s data and safety boundaries still apply.

## Validation

`npm run check`, `npm run typecheck`, `npm test`, and `npm run demo` run in CI on Node 22 and 24. The live smoke is opt-in and makes at most two synthetic paid requests.

## Related projects

[DecisionPacks](https://github.com/gbesse/decisionpacks) · [Question Forge](https://github.com/gbesse/question-forge) · [jev-screen](https://github.com/gbesse/jev-screen)

Independent project; not affiliated with TypeSafe AI. [TypeSafe API](https://docs.typesafe.ai/api) · [known model limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
