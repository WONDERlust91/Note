<script setup>
  import { useData, useRouter } from "vitepress";
  import { redirectDir } from "../utils/config.mts";

  const data =useData();
  const router = useRouter();
  const latestRedirectLink = data.theme.value.nav.find(item => item.text.toLowerCase() === redirectDir).link;
  
  router.go(latestRedirectLink);
</script>
