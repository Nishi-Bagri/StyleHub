import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from pathlib import Path
from apps.products.models import Product
import cloudinary.uploader


products = Product.objects.filter(image__isnull=False)

for product in products:
    print(f"\nProcessing: {product.name}")
    print(f"Current image: {product.image.name}")

    # Skip products already migrated to Cloudinary
    if product.image.name.startswith("stylehub/products/"):
        print("⏭️ Already on Cloudinary — skipping")
        continue

    local_file = Path("media") / product.image.name

    if not local_file.exists():
        print(f"❌ Local file not found: {local_file}")
        continue

    try:
        result = cloudinary.uploader.upload(
            str(local_file),
            folder="stylehub/products"
        )

        cloudinary_path = f"{result['public_id']}.{result['format']}"

        product.image.name = cloudinary_path
        product.save(update_fields=["image"])

        print("✅ Uploaded successfully")
        print("Cloudinary path:", cloudinary_path)
        print("Cloudinary URL:", result["secure_url"])

    except Exception as e:
        print(f"❌ Failed: {e}")