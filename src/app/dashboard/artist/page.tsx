"use client";
import { ArtistDashboard } from "@/modules/components/ArtistDashboard";
import React from "react";

const page = () => {
  return (
    <ArtistDashboard
      onBack={function (): void {
        throw new Error("Function not implemented.");
      }}
      language={"english"}
    />
  );
};

export default page;
