<template>
  <div>
    <Header>
      <Search class="me-auto" />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </Header>

    <Main fixed>
      <!-- Hero Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight mb-2">Help Center</h1>
        <p class="text-muted-foreground max-w-2xl">
          Find answers, get help, and contact our support team. We're here to assist you.
        </p>
      </div>

      <!-- Search Section -->
      <div class="mb-8 max-w-xl">
        <div class="relative">
          <SearchIcon :size="18" class="absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search help articles..."
            class="h-11 ps-10"
            v-model="searchQuery"
          />
        </div>
      </div>

      <Separator class="my-6" />

      <!-- Categories Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="category in filteredCategories"
          :key="category.title"
          class="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
          @click="handleCategoryClick(category)"
        >
          <CardHeader class="pb-3">
            <div class="mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <component :is="category.icon" :size="24" />
            </div>
            <CardTitle class="text-lg">{{ category.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-sm">{{ category.description }}</CardDescription>
          </CardContent>
          <CardFooter class="pt-0">
            <div class="flex items-center text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Browse articles
              <ArrowRight :size="14" class="ms-1" />
            </div>
          </CardFooter>
        </Card>
      </div>

      <!-- Popular Articles -->
      <div class="mt-12">
        <h2 class="text-xl font-semibold mb-4">Popular Articles</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div
            v-for="article in popularArticles"
            :key="article.title"
            class="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-accent cursor-pointer"
          >
            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText :size="18" class="text-muted-foreground" />
            </div>
            <div>
              <h3 class="font-medium text-sm mb-1">{{ article.title }}</h3>
              <p class="text-xs text-muted-foreground">{{ article.views }} views</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="mt-12 rounded-lg border bg-card p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold mb-1">Didn't find what you're looking for?</h2>
            <p class="text-muted-foreground text-sm">
              Our support team is here to help. Average response time: within 24 hours
            </p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline">
              <MessageCircle :size="16" class="me-2" />
              Live Chat
            </Button>
            <Button>
              <Ticket :size="16" class="me-2" />
              Submit Ticket
            </Button>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div class="space-y-2">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="rounded-lg border"
          >
            <button
              class="flex w-full items-center justify-between p-4 text-start hover:bg-accent/50 transition-colors"
              @click="toggleFaq(index)"
            >
              <span class="font-medium text-sm">{{ faq.question }}</span>
              <ChevronDown
                :size="18"
                :class="[
                  'text-muted-foreground transition-transform',
                  openFaqIndex === index && 'rotate-180'
                ]"
              />
            </button>
            <div
              v-if="openFaqIndex === index"
              class="px-4 pb-4"
            >
              <p class="text-sm text-muted-foreground">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'sonner'
import {
  BookOpen,
  MessageCircle,
  FileQuestion,
  Shield,
  Video,
  CreditCard,
  Search as SearchIcon,
  ArrowRight,
  FileText,
  Ticket,
  ChevronDown,
} from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import ProfileDropdown from '@/components/profile-dropdown.vue'
import Search from '@/components/search.vue'
import ThemeSwitch from '@/components/theme-switch.vue'
import ConfigDrawer from '@/components/config-drawer/ConfigDrawer.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const searchQuery = ref('')
const openFaqIndex = ref<number | null>(null)

const categories = [
  {
    title: 'Getting Started',
    description: 'Learn how to get started with the platform, including account setup and first-time user guide',
    icon: BookOpen,
  },
  {
    title: 'Common Questions',
    description: 'View the most frequently asked questions and answers to quickly resolve your doubts',
    icon: FileQuestion,
  },
  {
    title: 'Account & Billing',
    description: 'Manage your subscription, payment methods, and billing information',
    icon: CreditCard,
  },
  {
    title: 'Video Tutorials',
    description: 'Watch detailed tutorials and demonstrations on using the features',
    icon: Video,
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users to share experiences and best practices',
    icon: MessageCircle,
  },
  {
    title: 'Security & Privacy',
    description: 'Learn how we protect your data and ensure your security',
    icon: Shield,
  },
]

const popularArticles = [
  { title: 'How to reset your password?', views: 12580 },
  { title: 'How to upgrade your subscription?', views: 8932 },
  { title: 'How to invite team members?', views: 6721 },
  { title: 'How to export your data?', views: 4532 },
]

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click the register button and fill in your email and password to create an account. You can also quickly sign up using social accounts like Google or GitHub.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach us by clicking the live chat icon in the bottom right corner of the page, or by submitting a ticket. We will respond as soon as possible.',
  },
  {
    question: 'What are the limitations of the free version?',
    answer: 'The free version provides basic features, including up to 5 projects and 3 team members. Upgrade to the paid version to unlock more features.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'You can find the account deletion option in the settings page. Please make sure to back up all important data before deleting, as this action cannot be undone.',
  },
]

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) return categories
  const query = searchQuery.value.toLowerCase()
  return categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)
  )
})

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const handleCategoryClick = (category: typeof categories[0]) => {
  toast.info(`Opening "${category.title}" category`)
}
</script>
