import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';
import fs from 'fs/promises';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (!globalForPrisma.prisma) {
  const dbPath = path.join(process.cwd(), 'dev.db');

  console.log('DATABASE PATH:', dbPath);

  const adapter = new PrismaLibSql({
    url: `file:${dbPath}`,
  });

  globalForPrisma.prisma = new PrismaClient({
    adapter,
  });
}

prisma = globalForPrisma.prisma;

export async function POST(request: Request) {
  try {
    // ==========================================
    // 1. Membaca multipart/form-data
    // ==========================================
    const formData = await request.formData();

    // ==========================================
    // 2. Mengambil data text dari form
    // ==========================================
    const companyName = String(formData.get('companyName') ?? '');
    const industry = String(formData.get('industry') ?? '');
    const companySize = String(formData.get('companySize') ?? '');
    const address = String(formData.get('address') ?? '');

    const logoName = String(formData.get('logoName') ?? '');

    const adminName = String(formData.get('adminName') ?? '');
    const adminEmail = String(formData.get('adminEmail') ?? '');
    const adminPhone = String(formData.get('adminPhone') ?? '');
    const password = String(formData.get('password') ?? '');

    const timezone =
      String(formData.get('timezone') ?? '') || 'Asia/Makassar';

    const workingDays =
      String(formData.get('workingDays') ?? '') || 'Senin - Jumat';

    const rawDivisions =
      typeof formData.get('divisions') === 'string'
        ? String(formData.get('divisions'))
        : '';

    // ==========================================
    // 3. Validasi data wajib
    // ==========================================
    if (
      !companyName ||
      !industry ||
      !address ||
      !adminName ||
      !adminEmail ||
      !adminPhone ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data wajib belum lengkap.',
        },
        { status: 400 }
      );
    }

    // ==========================================
    // 4. Memecah divisi
    // ==========================================
    const divisionArray = rawDivisions
      .split(',')
      .map((div) => div.trim())
      .filter((div) => div.length > 0);

    // ==========================================
    // 5. Mengambil file logo
    // ==========================================
    const logo = formData.get('logo');

    let logoUrl: string | null = null;

    if (logo instanceof File && logo.size > 0) {
      // Validasi tipe file
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
      ];

      if (!allowedTypes.includes(logo.type)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Format logo harus PNG, JPG, JPEG, atau WEBP.',
          },
          { status: 400 }
        );
      }

      // Validasi ukuran maksimal 2MB
      const maxSize = 2 * 1024 * 1024;

      if (logo.size > maxSize) {
        return NextResponse.json(
          {
            success: false,
            error: 'Ukuran logo maksimal 2MB.',
          },
          { status: 400 }
        );
      }

      // ==========================================
      // 6. Menentukan ekstensi file
      // ==========================================
      const originalName = logo.name || 'logo';
      const extension =
        path.extname(originalName).toLowerCase() ||
        (logo.type === 'image/png' ? '.png' : '.jpg');

      // Buat nama file unik
      const uniqueFileName = `${crypto.randomUUID()}${extension}`;

      // ==========================================
      // 7. Menentukan folder penyimpanan
      // ==========================================
      const uploadDir = path.join(
        process.cwd(),
        'public',
        'uploads',
        'company'
      );

      await fs.mkdir(uploadDir, {
        recursive: true,
      });

      // ==========================================
      // 8. Simpan file ke filesystem
      // ==========================================
      const filePath = path.join(uploadDir, uniqueFileName);

      const arrayBuffer = await logo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.writeFile(filePath, buffer);

      // URL yang bisa digunakan browser
      logoUrl = `/uploads/company/${uniqueFileName}`;

      console.log('LOGO SAVED:', filePath);
      console.log('LOGO URL:', logoUrl);
    }

    // ==========================================
    // 9. Simpan Company + Admin + Division
    // ==========================================
    const newCompany = await prisma.company.create({
      data: {
        name: companyName,
        industry,
        size: companySize || null,
        address,
        logoName: logoName || null,
        logoUrl,

        timezone,
        workingDays,

        admins: {
          create: [
            {
              name: adminName,
              email: adminEmail,
              phone: adminPhone,
              password,
            },
          ],
        },

        divisions: {
          create: divisionArray.map((divName) => ({
            name: divName,
          })),
        },
      },

      include: {
        admins: true,
        divisions: true,
      },
    });

    // ==========================================
    // 10. Response sukses
    // ==========================================
    return NextResponse.json({
      success: true,
      message: 'Workspace berhasil dibuat!',
      data: newCompany,
    });
  } catch (error) {
    console.error('CRITICAL ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Gagal membuat workspace perusahaan.',
      },
      { status: 500 }
    );
  }
}