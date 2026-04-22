import os
import re

ui_dir = r"d:\GitHub\aulavirtual\src\features\web\landing\components\ui"

for filename in os.listdir(ui_dir):
    if filename.endswith(".tsx"):
        filepath = os.path.join(ui_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace "@/components/ui/XXX" with "./XXX"
        # and "@components/ui/XXX" with "./XXX"
        new_content = re.sub(r'from "@/?components/ui/', 'from "./', content)
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
