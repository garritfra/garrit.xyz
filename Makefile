optimize-image:
	@if [ -z "$(file)" ]; then \
		echo "Usage: make optimize-image file=<file_path>"; \
	else \
		magick mogrify -format jpeg -sampling-factor 4:2:0 -strip -quality 80 -interlace JPEG -colorspace sRGB "$(file)"; \
		echo "Optimized $(file)"; \
	fi