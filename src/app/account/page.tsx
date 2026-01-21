"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";

export default function AccountPage() {
  const [user, setUser] = React.useState({
    name: "Angger Dhisma Kusuma",
    email: "angger.dhisma@binus.ac.id",
    phone: "+62 895-4240-00953",
    address: "Jl. Pakuan No. 3, Bogor",
    bio: "Saya suka traveling dan menjelajahi tempat-tempat baru",
    profilePhoto: null as string | null,
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop states
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any,
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      if (imageToCrop && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageToCrop,
          croppedAreaPixels,
        );
        setFormData({
          ...formData,
          profilePhoto: croppedImage,
        });
        setShowCropModal(false);
        setImageToCrop(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div>
      {/* Main Profile Card */}
      <div className="flex justify-center items-center pt-12 px-4 py-12">
        <div className="bg-gray-100 rounded-tr-4xl rounded-bl-4xl shadow-2xl w-200 min-w-[85%] p-15">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-8">
            {/* Avatar */}
            <div
              className={`w-50 h-50 bg-gray-400 rounded-full shrink-0 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative ${isEditing ? "cursor-pointer hover:opacity-80" : ""}`}
              onClick={handlePhotoClick}
            >
              {formData.profilePhoto ? (
                <Image
                  src={formData.profilePhoto}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />

            {/* Name and Email */}
            <div className="flex-1 py-7">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-300 rounded-lg px-4 py-2 mb-3 text-lg font-semibold"
                    placeholder="Nama"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-300 rounded-lg px-4 py-2 text-sm"
                    placeholder="Email"
                  />
                </>
              ) : (
                <>
                  <div className="h-13 bg-gray-300 rounded-lg mb-3 flex items-center px-4 text-lg font-semibold">
                    {user.name}
                  </div>
                  <div className="h-10 bg-gray-300 rounded-lg flex items-center px-4 text-sm text-gray-700">
                    {user.email}
                  </div>
                </>
              )}
            </div>

            {/* Info Cards on Right */}
            <div className="flex flex-col gap-3 p-3">
              {isEditing ? (
                <>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-52 bg-gray-300 rounded-lg px-4 py-3 text-sm"
                    placeholder="Nomor Telepon"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-52 bg-gray-300 rounded-lg px-4 py-3 text-sm"
                    placeholder="Alamat"
                  />
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-52 bg-gray-300 rounded-lg px-4 py-3 text-sm"
                    placeholder="Bio"
                  />
                </>
              ) : (
                <>
                  <div className="w-52 h-12 bg-gray-300 rounded-2xl flex items-center px-4 text-sm">
                    {user.phone}
                  </div>
                  <div className="w-52 h-12 bg-gray-300 rounded-2xl flex items-center px-4 text-sm">
                    {user.address}
                  </div>
                  <div className="w-52 h-12 bg-gray-300 rounded-2xl flex items-center px-4 text-xs">
                    {user.bio}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bio/Description Section */}
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-gray-300 rounded-lg px-4 py-3 h-20 resize-none text-sm"
              placeholder="Ceritakan tentang diri Anda..."
            />
          ) : (
            <div className="bg-gray-300 rounded-lg px-4 py-4 h-20 text-sm text-gray-700">
              {user.bio}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && imageToCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[90%] max-w-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Crop Photo
            </h2>

            <div className="relative w-full h-100 bg-gray-200 rounded-lg overflow-hidden">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-600 mb-2 block">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCropSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Crop & Save
              </button>
              <button
                onClick={handleCropCancel}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}