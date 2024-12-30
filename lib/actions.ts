"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { CONSTRUCTION_BY_SLUG_QUERY, PROJECT_BY_SLUG_QUERY, PROJECT_DETAIL_BY_SLUG_QUERY, PROJECT_DETAILS_BY_QUERY } from "@/sanity/lib/queries";

export const createPitch = async (state: any, form: FormData, pitch: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch
    }

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const createConstruction = async (state: any, form: FormData, pitch: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery && resultQuery.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const construction = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: "6cf8dae8-a4fb-4acb-af7a-f88510cd9799", //session?.id
      },
      pitch
    }

    const result = await writeClient.create({ _type: "construction", ...construction });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}


export const createProject = async (state: any, form: FormData, pitch: string, constructionId: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery && resultQuery.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: "6cf8dae8-a4fb-4acb-af7a-f88510cd9799", //session?.id
      },
      construction: {
        _type: "reference",
        _ref: constructionId,
      },
      pitch
    }

    const result = await writeClient.create({ _type: "project", ...projectData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}


export const createProjectDetail = async (state: any, form: FormData, pitch: string, projectId: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await client.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery && resultQuery.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectDetailData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: "6cf8dae8-a4fb-4acb-af7a-f88510cd9799", //session?.id
      },
      project: {
        _type: "reference",
        _ref: projectId,
      },
      pitch
    }

    const result = await writeClient.create({ _type: "projectDetail", ...projectDetailData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}