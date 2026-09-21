# Citation retrieval

Jev Roast never asks the model to write criticism. A deterministic splitter records source offsets. For weak dimensions only, Jev chooses among at most 255 original spans. Oversized candidate sets are ranked by instruction-keyword overlap, useful length, and source order; the selected output is then looked up by offset and copied byte-for-byte.
