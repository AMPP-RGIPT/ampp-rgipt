import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, 'src', 'assets', 'gallery');
const TEAM_DIR = path.join(__dirname, 'src', 'assets', 'team');
const CAPSULE_DIR = path.join(__dirname, 'src', 'assets', 'capsule');

async function optimizeGallery() {
  console.log('--- Optimizing Gallery Images ---');
  if (!fs.existsSync(GALLERY_DIR)) {
    console.log('Gallery directory not found:', GALLERY_DIR);
    return;
  }

  const files = fs.readdirSync(GALLERY_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue;
    }

    const filePath = path.join(GALLERY_DIR, file);
    const basename = path.basename(file, path.extname(file));
    // Standardize to lowercase '.jpg'
    const targetFileName = `${basename.toLowerCase()}.jpg`;
    const targetPath = path.join(GALLERY_DIR, targetFileName);

    console.log(`Processing gallery file: ${file}...`);
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      // Resize to max 1200px width/height while maintaining aspect ratio
      if (metadata.width > 1200 || metadata.height > 1200) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 1200 : undefined,
          height: metadata.height >= metadata.width ? 1200 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convert to progressive jpeg with 78% quality
      const buffer = await pipeline
        .jpeg({
          quality: 78,
          progressive: true,
          mozjpeg: true // Use production-grade encoder if available
        })
        .toBuffer();

      // Write to a temporary file, then rename/delete original to avoid file-in-use issues
      const tempPath = path.join(GALLERY_DIR, `temp_${targetFileName}`);
      fs.writeFileSync(tempPath, buffer);

      // If original file name is different from target (e.g. 1.JPG vs 1.jpg on Windows),
      // we need to be careful with case-insensitive file systems.
      if (filePath.toLowerCase() === targetPath.toLowerCase()) {
        fs.unlinkSync(filePath);
      } else {
        fs.unlinkSync(filePath);
      }

      fs.renameSync(tempPath, targetPath);
      console.log(`  Successfully optimized: ${file} -> ${targetFileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error processing ${file}:`, err.message);
    }
  }
}

async function optimizeTeam() {
  console.log('\n--- Optimizing Team Images ---');
  if (!fs.existsSync(TEAM_DIR)) {
    console.log('Team directory not found:', TEAM_DIR);
    return;
  }

  const files = fs.readdirSync(TEAM_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue;
    }

    const filePath = path.join(TEAM_DIR, file);
    const basename = path.basename(file, path.extname(file));
    // Standardize to lowercase '.jpg'
    const targetFileName = `${basename.toLowerCase()}.jpg`;
    const targetPath = path.join(TEAM_DIR, targetFileName);

    console.log(`Processing team file: ${file}...`);
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      // Resize to max 600px width/height for team avatars (avatar cards are small, 600px is perfect for high-dpi screens)
      if (metadata.width > 600 || metadata.height > 600) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 600 : undefined,
          height: metadata.height >= metadata.width ? 600 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convert to progressive jpeg with 75% quality
      const buffer = await pipeline
        .jpeg({
          quality: 75,
          progressive: true,
          mozjpeg: true
        })
        .toBuffer();

      const tempPath = path.join(TEAM_DIR, `temp_${targetFileName}`);
      fs.writeFileSync(tempPath, buffer);

      // Clean up original file
      fs.unlinkSync(filePath);
      
      // If there was an old file with different extension (e.g. rudrakshchamoli.png), remove it
      if (ext !== '.jpg' && fs.existsSync(targetPath)) {
        try {
          fs.unlinkSync(targetPath);
        } catch (_) {}
      }

      fs.renameSync(tempPath, targetPath);
      console.log(`  Successfully optimized: ${file} -> ${targetFileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error processing ${file}:`, err.message);
    }
  }
}

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');

async function optimizeRootAssets() {
  console.log('\n--- Optimizing Root Assets ---');
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('Root assets directory not found:', ASSETS_DIR);
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(ASSETS_DIR, file);
    
    // Only optimize files, not directories
    if (fs.statSync(filePath).isDirectory()) {
      continue;
    }

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    // Skip small images below 30 KB
    const stats = fs.statSync(filePath);
    if (stats.size < 30 * 1024) {
      continue;
    }

    console.log(`Processing root asset: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      // Resize to max 1600px width/height for high-quality banners/heros
      if (metadata.width > 1600 || metadata.height > 1600) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 1600 : undefined,
          height: metadata.height >= metadata.width ? 1600 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      let buffer;
      let targetFileName = file.toLowerCase();
      
      if (ext === '.png') {
        buffer = await pipeline
          .png({
            quality: 75,
            compressionLevel: 8
          })
          .toBuffer();
      } else {
        buffer = await pipeline
          .jpeg({
            quality: 75,
            progressive: true,
            mozjpeg: true
          })
          .toBuffer();
      }

      const targetPath = path.join(ASSETS_DIR, targetFileName);
      const tempPath = path.join(ASSETS_DIR, `temp_${targetFileName}`);
      fs.writeFileSync(tempPath, buffer);

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, targetPath);
      console.log(`  Successfully optimized: ${file} -> ${targetFileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error processing ${file}:`, err.message);
    }
  }
}

async function optimizeCapsules() {
  console.log('\n--- Optimizing Capsule Images ---');
  if (!fs.existsSync(CAPSULE_DIR)) {
    console.log('Capsule directory not found:', CAPSULE_DIR);
    return;
  }

  const files = fs.readdirSync(CAPSULE_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    const filePath = path.join(CAPSULE_DIR, file);
    console.log(`Processing capsule file: ${file}...`);
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      let pipeline = image;
      // Resizing to max 180px for capsule icons since they are displayed at max ~100px.
      if (metadata.width > 180 || metadata.height > 180) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? 180 : undefined,
          height: metadata.height >= metadata.width ? 180 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      const buffer = await pipeline
        .png({
          quality: 75,
          compressionLevel: 8
        })
        .toBuffer();

      const targetFileName = file.toLowerCase();
      const targetPath = path.join(CAPSULE_DIR, targetFileName);
      const tempPath = path.join(CAPSULE_DIR, `temp_${targetFileName}`);
      fs.writeFileSync(tempPath, buffer);

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, targetPath);
      console.log(`  Successfully optimized capsule: ${file} -> ${targetFileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error processing capsule ${file}:`, err.message);
    }
  }
}

async function run() {
  const start = Date.now();
  await optimizeGallery();
  await optimizeTeam();
  await optimizeCapsules();
  await optimizeRootAssets();
  const end = Date.now();
  console.log(`\nOptimization finished in ${((end - start) / 1000).toFixed(2)}s`);
}

run();
