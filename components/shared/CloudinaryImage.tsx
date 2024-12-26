"use client"

import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type CloudinaryImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
}

const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return optimizeCloudinaryImage(src, {
    f_auto: true,
    q_auto: true,
    w: width,
  });
};

export const CloudinaryImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {

  return (
    <Image
      loader={cloudinaryLoader}
      src={src}
      className={cn(
        "transition duration-300 blur-0",
        className
      )}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  )
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      loader={cloudinaryLoader}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...rest}
    />
  );
};

const optimizeCloudinaryImage = (url: string, options: { [key: string]: string | number | boolean }) => {
  // Kiểm tra URL có thuộc Cloudinary hay không
  if (!url.includes('res.cloudinary.com')) {
    return url; // Nếu không phải URL Cloudinary, trả về nguyên URL
  }

  // Tách URL thành các phần
  const [base, imagePath] = url.split('/upload/');
  
  // Tạo chuỗi các tham số từ options, xử lý giá trị boolean đúng cách
  const transformations = Object.entries(options)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        // Chuyển boolean thành chuỗi "true" cho giá trị "true" và bỏ qua "false"
        return value ? `${key}` : '';
      }
      return `${key}_${value}`;
    })
    .filter(Boolean)  // Loại bỏ chuỗi rỗng
    .join(',');

  // Chèn các tham số vào URL
  return `${base}/upload/${transformations}/${imagePath}`;
};