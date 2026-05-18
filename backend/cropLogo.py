import os
import sys
import subprocess

def run():
    # Install pillow and requests if not installed
    try:
        from PIL import Image
        import requests
    except ImportError:
        print("Installing pillow and requests...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow", "requests"])
        from PIL import Image
        import requests

    logo_url = "https://sunvisionsociety.com/uploads/1596723247_logo.png"
    print(f"Downloading logo from: {logo_url}")
    
    response = requests.get(logo_url, stream=True)
    if response.status_code != 200:
        print("Failed to download logo.")
        sys.exit(1)
        
    temp_logo_path = "temp_logo.png"
    with open(temp_logo_path, "wb") as f:
        f.write(response.content)
        
    img = Image.open(temp_logo_path)
    width, height = img.size
    print(f"Logo dimensions: {width}x{height}")
    
    # The emblem is on the left side of the image. 
    # Since it is a circle, it fits within a square of height x height.
    # Let's crop the left square: (0, 0, height, height)
    # We will add a small margin if needed, or just crop height x height.
    # Let's crop slightly inside height x height to avoid text edges, e.g. (0, 0, int(height * 0.95), height)
    crop_box = (0, 0, height, height)
    emblem = img.crop(crop_box)
    
    # Save as favicon.ico in frontend/public/
    public_dir = os.path.abspath("../frontend/public")
    app_dir = os.path.abspath("../frontend/src/app")
    
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)
    
    favicon_path = os.path.join(public_dir, "favicon.ico")
    icon_path = os.path.join(app_dir, "icon.png")
    
    # Save as favicon (supports sizes like 16x16, 32x32)
    emblem.save(favicon_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Saved favicon to {favicon_path}")
    
    # Save as high-res icon.png
    emblem.save(icon_path, format="PNG")
    print(f"Saved icon to {icon_path}")
    
    # Clean up temp logo
    if os.path.exists(temp_logo_path):
        os.remove(temp_logo_path)
        
    print("Logo cropping and favicon creation complete!")

if __name__ == "__main__":
    run()
