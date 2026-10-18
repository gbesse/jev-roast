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

## Unicode citation coordinates / Coordonnées Unicode / Coordenadas Unicode

EN: Spans now declare `offsetUnit: utf16-code-unit` for existing JavaScript `start`/`end`, plus `byteStart`/`byteEnd` in the UTF-8 encoding of the supplied string. Neither coordinate system changes source quotes. This allows non-JavaScript consumers to slice accented/emoji text correctly. Review thresholds and semantic scores are bounded before use; invented second-pass citations fail instead of disappearing. Packs are snapshotted before async evaluation. UTF-8 coordinates describe the supplied JavaScript string, not authenticated original file bytes or validated writing-quality judgments.

FR : Les passages déclarent désormais `offsetUnit: utf16-code-unit` pour les `start`/`end` JavaScript existants, et `byteStart`/`byteEnd` dans l’encodage UTF-8 de la chaîne fournie. Aucun système ne modifie les citations. Les consommateurs externes peuvent découper correctement accents/emoji. Seuils et scores sont bornés ; des citations inventées échouent au lieu de disparaître. Les packs sont capturés avant attente. Ces coordonnées décrivent la chaîne JavaScript fournie, pas les octets originaux authentifiés ni une qualité rédactionnelle validée.

ES: Pasajes declaran `offsetUnit: utf16-code-unit` para `start`/`end` JavaScript existentes, y `byteStart`/`byteEnd` en UTF-8 de la cadena proporcionada. No cambian citas. Permite a consumidores externos cortar correctamente acentos/emoji. Umbrales/scores limitados; citas inventadas fallan en lugar de desaparecer. Captura packs antes de esperar. Coordenadas describen la cadena JavaScript, no bytes originales autenticados ni juicios de calidad validados.


FR : La première réponse et ses compteurs sont copiés avant le second passage ; un fournisseur réutilisant ses objets ne peut plus réécrire le score initial pendant la sélection de citations. Les citations restent des propriétés propres, même pour un ID comme `__proto__`, et exigent une réponse `choice`. Ces contrôles préservent les preuves du pipeline ; ils ne mesurent pas la qualité éditoriale.

EN: The first response and its counters are copied before pass two; providers reusing objects cannot rewrite the initial score during citation selection. Citations remain own properties even for IDs such as `__proto__` and require a `choice` response. These checks preserve pipeline evidence; they do not measure editorial quality.

ES: La primera respuesta y sus contadores se copian antes del segundo paso; un proveedor que reutiliza objetos no puede reescribir la puntuación inicial al elegir citas. Las citas siguen siendo propiedades propias incluso con ID como `__proto__` y exigen respuesta `choice`. Preserva pruebas del pipeline; no mide calidad editorial.
