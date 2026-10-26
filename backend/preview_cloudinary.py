
import csv
import requests
from io import BytesIO
from PIL import Image, ImageDraw
from pathlib import Path

assets = []

with open("cloudinary_assets.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        assets.append(row)

thumb_w, thumb_h = 260, 240
label_h = 50
cols = 4
rows = (len(assets) + cols - 1) // cols

sheet = Image.new(
    "RGB",
    (cols * thumb_w, rows * (thumb_h + label_h)),
    "white",
)
draw = ImageDraw.Draw(sheet)

for i, asset in enumerate(assets):
    try:
        response = requests.get(asset["secure_url"], timeout=20)
        response.raise_for_status()
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image.thumbnail((thumb_w - 10, thumb_h - 10))

        x = (i % cols) * thumb_w
        y = (i // cols) * (thumb_h + label_h)

        sheet.paste(image, (x + (thumb_w - image.width) // 2, y + 5))
        public_id = asset["public_id"].split("/")[-1]
        draw.text((x + 5, y + thumb_h), f"Asset {i + 1}", fill="black")
        draw.text((x + 5, y + thumb_h + 20), public_id[:24], fill="black")
    except Exception as exc:
        print("Failed:", asset.get("public_id"), exc)

output = Path("cloudinary_contact_sheet.jpg")
sheet.save(output, quality=90)
print("Created:", output.resolve())
