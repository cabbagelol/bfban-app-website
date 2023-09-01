<script>
import axios from "axios";

export default {
  created() {
    const self = this
    self.getVersions();
  },

  methods: {
    onLanguageChange() {
      const path = new URL(location);
    },
    getVersions() {
      const self = this;
      axios({
        method: 'get',
        url: './config/version.json',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async function (response) {
        const d = response.data;

        self.newVersion = Object.assign(
            {
              describe: await self.getCurrentVersionPackage(d.list[0].version)
            },
            d.list[0]
        );
      });
    },

    async getCurrentVersionPackage(version) {
      if (!version) return;

      return new Promise(async resolve => {
        let describe = "";

        let response = await axios({
          method: 'get',
          url: './config/news.json',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        response.data.news.forEach(i => {
          if (i.username == version)
            describe = i.content.join("\n");
        });

        resolve(describe);
      })
    }
  },

  setup() {
    return {
      newVersion: {
        describe: ""
      },
    }
  }
}
</script>

<template>
  <div>
    <div class="menu">
      <div class="container">
        <div class="row">
          <div class="col-10">
            <div
                style="border-bottom: 2px solid #fff;height: 40px;float:left;margin:20px 30px 0 0;text-align:center;color: rgba(255, 255, 255, 0.64);">
              {{ $t("nav.home") }}
            </div>
            <block v-for="i of [{'n': 'officeWebSite', 'u': 'https://bfban.com'}]">
              <a :href="i.u" target="_blank">
                <div
                    style="height: 40px;float:left;margin:20px 30px 0 0;text-align:center;color: rgba(255, 255, 255, 0.64);">
                  {{ $t("nav." + i.n) }}
                </div>
              </a>
            </block>
          </div>
          <div class="col-2" align="right">
            <div class="form-floating">
              <select v-model="$i18n.locale" @change="onLanguageChange" class="form-select"
                      aria-label="Floating label select example">
                <option value="zh" selected>中文</option>
                <option value="en">English</option>
              </select>
              <label for="floatingSelect">language</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="overflow: hidden;">
      <div class="container">
        <section class="row">
          <div class="col-12 col-sm-9 col-md-5">
            <div class="container">
              <h1>
                <font style="vertical-align: inherit;">
                  <b>{{ $t("home.h1-name") }}</b>
                  <br/>{{ $t("home.h1") }}
                </font>
              </h1>
              <p class="lead text-muted">
                <font style="vertical-align: inherit;">
                  {{ $t("home.h2") }}
                </font>
              </p>
              <p class="text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path
                      d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                {{ $t("home.hint") }}
              </p>
              <br/>
              <div class="btn-group">
                <button class="btn btn-secondary" type="button"
                        data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  {{ $t('home.downloadShow.button') }}
                </button>
                <ul class="dropdown-menu">
                  <li><h6 class="dropdown-header">{{ $t('home.downloadShow.title') }}</h6></li>
                  <table class="table table-borderless table-striped table-lg"
                         style="white-space:nowrap;">
                    <thead>
                    <tr>
                      <th scope="col" colspan="2"></th>
                      <th scope="col" class="text-center">
                        <span class="badge text-bg-primary">{{ $t('home.downloadShow.fromFormal') }}</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="badge text-bg-secondary">{{ $t('home.downloadShow.fromTest') }}</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th scope="row">Google Play</th>
                      <td>Android platform</td>
                      <td class="text-center">
                        <a href="https://play.google.com/store/apps/details?id=com.cabbagelol.bfban"
                           target="_blank">
                          <i class="bi bi-arrow-down-circle-fill"></i>
                        </a>
                      </td>
                      <td class="text-center">
                        <a href="https://play.google.com/apps/testing/com.cabbagelol.bfban"
                           target="_blank">
                          <i class="bi bi-arrow-down-circle-fill"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Apple Store</th>
                      <td>ios or macos platform</td>
                      <td class="text-center">
                        <a href="https://apps.apple.com/us/app/bfban/id6446828173" target="_blank">
                          <i class="bi bi-arrow-down-circle-fill"></i>
                        </a>
                      </td>
                      <td class="text-center">
                        <a href="https://testflight.apple.com/join/PulChYQj" target="_blank">
                          <i class="bi bi-arrow-down-circle-fill"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Github BFBAN Build</th>
                      <td>Android platform</td>
                      <td class="text-center">
                        <a href="https://github.com/bfban/bfban-app-mobile/releases" target="_blank"
                           data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="更新慢">
                          <i class="bi bi-arrow-down-circle-fill"></i>
                        </a>
                      </td>
                      <td class="text-center">
                        <i class="bi bi-x-circle"></i>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <li class="dropdown-item-text">
                    <div class="row align-items-center">
                      <div class="col-10">
                        <p>
                          <span class="badge text-bg-primary">{{ $t('home.downloadShow.fromFormal') }}</span>
                          <span class="badge text-bg-light">android</span>
                          <span class="badge text-bg-light">ios</span>
                        </p>
                        {{ $t('home.downloadShow.downloadQRCode') }}
                      </div>
                      <div class="col-1">
                        <img src="../assets/images/app_auto_qr.png" width="60" height="60">
                      </div>
                    </div>
                  </li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><h6 class="dropdown-header"> {{ $t('home.other') }}</h6></li>
                  <a href="../../public/privacy" target="_blank">
                    <li class="row align-items-center">
                      <div class="col">
                        <button type="button" class="btn btn-link">{{ $t('agreement.privacyAgreement') }}</button>
                      </div>
                      <div class="col text-right mr-3">
                        <i class="bi bi-arrow-up-right-square"></i>&emsp;
                      </div>
                    </li>
                  </a>
                  <a href="../../public/agreement" target="_blank">
                    <li class="row align-items-center">
                      <div class="col">
                        <button type="button" class="btn btn-link">{{ $t('agreement.userAgreement') }}</button>
                      </div>
                      <div class="col text-right mr-3">
                        <i class="bi bi-arrow-up-right-square"></i>&emsp;
                      </div>
                    </li>
                  </a>
                </ul>
                <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                  <li v-for="i of [{'n': '1', 'u': 'https://docs.qq.com/form/page/DVGNkVlZxWGJMYWhC'},
                                {'n':'2', 'u': 'https://docs.qq.com/form/page/DVFFMS1lQbFVTUmNZ'},
                                {'n': '3', 'u': 'https://cabbagelol.github.io/bfban-app-mobile-docs'},
                                {'n': '4', 'u': 'https://cabbagelol.net/donations'}]">
                    <a class="dropdown-item" :href="i.u" target="_blank">{{ $t('home.downloadMore.' + i.n) }}</a>
                  </li>
                </ul>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm">
                  <div class=" text-muted"><a href="#" class="badge badge-warning">{{ $t('home.version') }}</a>
                  </div>
                </div>
                <div class="col-sm">
                  <div class=" text-muted">{{ newVersion.version }}</div>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm">
                  <div class=" text-muted"><a href="#" class="badge badge-primary">{{ $t('home.release') }}</a>
                  </div>
                </div>
                <div class="col-sm">
                  <div class=" text-muted">{{ newVersion.stage }}</div>
                </div>
              </div>
              <br>
              <div class="row">
                <div class="col-sm">
                  <div class=" text-muted" v-html="newVersion.describe"></div>
                </div>
              </div>
              <br>
            </div>
          </div>
          <div class="col-12 col-sm-3 col-md-7" style="position: relative;height: 800px;">
            <img src="../assets/images/exhibition.png" class="exhibition">
          </div>
        </section>
      </div>
    </div>

    <div class="hq">
      <div class="container">
        <h3>{{ $t('home.Q&A.title') }}</h3>
        <b>{{ $t('home.Q&A.1.q') }}</b>
        <p>{{ $t('home.Q&A.1.a') }}</p>
        <b>{{ $t('home.Q&A.2.q') }}</b>
        <p>{{ $t('home.Q&A.2.a') }}</p>
        <b>{{ $t('home.Q&A.3.q') }}</b>
        <p>{{ $t('home.Q&A.3.a') }}</p>
        <b>{{ $t('home.Q&A.4.q') }}</b>
        <p>{{ $t('home.Q&A.4.a') }}</p>
        <b>{{ $t('home.Q&A.5.q') }}</b>
        <p>{{ $t('home.Q&A.5.a') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
