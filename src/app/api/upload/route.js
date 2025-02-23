// pages/api/upload.js
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getDocument } from 'pdfjs-dist';
import mammoth from 'mammoth';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = file.name;
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, filename);

    // Write the file to disk
    await writeFile(filePath, buffer);

    let parsedData = '';

    // Parse the file based on its type
    const extension = filename.split('.').pop().toLowerCase();
    
    if (extension === 'pdf') {
      // Load the PDF file
      const loadingTask = getDocument(filePath);
      const pdfDocument = await loadingTask.promise;
      
      // Extract text from all pages
      const numPages = pdfDocument.numPages;
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        parsedData += textContent.items.map(item => item.str).join(' ') + '\n';
      }
    } else if (extension === 'docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      parsedData = result.value;
    } else {
      return new Response('Unsupported file type', { status: 400 });
    }

    console.log(parsedData);

    // Return the parsed data
    return new Response(JSON.stringify({
      fileUrl: filePath,
      parsedData
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Set larger limit for API route
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes
