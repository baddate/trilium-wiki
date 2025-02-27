#!/bin/bash

# 指定目录
TARGET_DIR=${1:-"."}

# 默认 description 内容
DEFAULT_DESCRIPTION=""

# 遍历指定目录下的所有 .md 文件
find "$TARGET_DIR" -type f -name "*.md" | while read -r file; do
  # 检查是否已经有 Frontmatter
  # if grep -q "^---" "$file"; then
  #   echo "Skipping: $file (Frontmatter already exists)"
  #   continue
  # fi

  # 获取文件名作为 title
  filename=$(basename "$file")
  title="${filename%.md}"

  # 创建临时文件并写入 Frontmatter 和原始内容
  tmpfile=$(mktemp)
  {
    echo "---"
    echo "title: \"$title\""
    echo "description: \"$DEFAULT_DESCRIPTION\""
    echo "---"
    cat "$file"
  } >"$tmpfile"

  # 替换原始文件
  mv "$tmpfile" "$file"
  echo "Processed: $file"
done

echo "All .md files processed."
