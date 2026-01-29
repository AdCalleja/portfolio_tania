import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image, Slug } from "@sanity/types";
import groq from "groq";

export async function getProjects(): Promise<Project[]> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && defined(slug.current)] | order(order asc, year desc, _createdAt desc)`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Project {
  _type: "project";
  _createdAt: string;
  title?: string;
  slug: Slug;
  year?: number;
  production?: string;
  role?: string;
  collaborators?: string[];
  materials?: string[];
  techniques?: string[];
  tags?: string[];
  featured?: boolean;
  order?: number;
  excerpt?: string;
  heroImage?: Image & { alt?: string };
  gallery?: Array<Image & { alt?: string; caption?: string }>;
  videoUrl?: string;
  description?: PortableTextBlock[];
}
