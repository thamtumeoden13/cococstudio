import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		GitHubProvider,
		GoogleProvider,
	],
	callbacks: {
		async signIn({
			user,
			account,
			profile
		}) {
			if (account.provider === "github") {
				const { name, email, image } = user
				const { id, login, bio } = profile
				const existingUser = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id: id,
					});
				if (!existingUser) {
					await writeClient.create({
						_type: "author",
						id,
						name,
						username: login,
						userEmail: email,
						image,
						bio: bio || "",
					});
				}

			} else if (account.provider === "google") {
				const { name, email, image } = user
				const { sub } = profile
				const existingUser = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id: sub,
					});
				if (!existingUser) {
					await writeClient.create({
						_type: "author",
						id: sub,
						name,
						username: email,
						userEmail: email,
						image,
						bio: "",
					});
				}
			}

			return true;
		},
		async jwt({ token, account, profile }) {
			if (account) {
				let id = ""
				if (account.provider === "github" && profile?.id) {
					id = profile.id
				} else if (account.provider === "google" && profile?.sub) {
					id = profile.sub
				}
				const userById = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id: id,
					});

				token.id = userById?._id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session) {
				Object.assign(session, { id: token.id });
			}
			return session;
		},
		// async redirect({ url, baseUrl }) {
		// 	// Allows relative callback URLs
		// 	if (url.startsWith("/")) return `${baseUrl}${url}`
		// 	// Allows callback URLs on the same origin
		// 	else if (new URL(url).origin === baseUrl) return url
		// 	return baseUrl
		// }
	},
});